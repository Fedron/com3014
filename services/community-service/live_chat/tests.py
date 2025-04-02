from asgiref.sync import sync_to_async
from django.test import TestCase
from django.urls import path
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from community.models import Community
from user.models import User
from .models import ChatLog
from .consumers import ChatConsumer


class LiveChatTestCase(TestCase):
    @sync_to_async
    def chatSetUp(self):
        user = User(uid = 1)
        user.full_clean()
        user.save()
        self.user = user
        community = Community(name = 'testCommunity')
        community.full_clean()
        community.save()
        self.community = community
        self.router = URLRouter([
            path('v1/communities/<int:community_id>/chat/', ChatConsumer.as_asgi()),
        ])

    @sync_to_async
    def checkLog(self, msg):
        try:
            ChatLog.objects.get(user = self.user, message = msg)
        except ChatLog.DoesNotExist:
            return False
        return True

    async def test_live_chat(self):
        await self.chatSetUp()
        ws1 = WebsocketCommunicator(self.router, '/v1/communities/' + str(self.community.id) + '/chat/')
        ws2 = WebsocketCommunicator(self.router, '/v1/communities/' + str(self.community.id) + '/chat/')
        connected, _ = await ws1.connect()
        assert connected
        connected, _ = await ws2.connect()
        assert connected

        valid = {
            'type': 'chat.send',
            'user_id': self.user.uid,
            'username': 'testUser',
            'message': 'testMessage'
        }

        await ws1.send_json_to(valid)
        response = await ws1.receive_json_from()
        self.assertEqual(response['type'], 'chat.message')
        self.assertEqual(response['username'], valid['username'])
        self.assertEqual(response['message'], valid['message'])
        response = await ws2.receive_json_from()
        self.assertEqual(response['type'], 'chat.message')
        self.assertEqual(response['username'], valid['username'])
        self.assertEqual(response['message'], valid['message'])

        logged = await self.checkLog(valid['message'])
        assert logged

        invalid = {
            'type': 'chat.send',
            'user_id': 'wrong',
            'username': 'testUser',
            'message': 'testMessage'
        }

        await ws1.send_json_to(invalid)
        response = await ws1.receive_json_from()
        self.assertEqual(response['type'], 'chat.error')
        self.assertEqual(response['error'], 'Invalid user ID')
        assert await ws2.receive_nothing()

        invalid = {
            'type': 'chat.send',
            'user_id': self.user.uid,
            'username': 'testUser',
            'message': ''
        }
        
        await ws1.send_json_to(invalid)
        response = await ws1.receive_json_from()
        self.assertEqual(response['type'], 'chat.error')
        self.assertEqual(response['error'], 'Unable to log message; message not sent')
        assert await ws2.receive_nothing()

        await ws1.disconnect()
        await ws2.disconnect()

    async def test_invalid_live_chat(self):
        await self.chatSetUp()
        ws = WebsocketCommunicator(self.router, '/v1/communities/69/chat/')
        connected, _ = await ws.connect()
        assert not connected
