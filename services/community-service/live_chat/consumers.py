import json
from channels.generic.websocket import AsyncWebsocketConsumer
from community.models import Community
from channels.exceptions import DenyConnection
from django.core.exceptions import ValidationError
from asgiref.sync import sync_to_async
from user.models import User
from .models import ChatLog


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        community_id = self.scope['url_route']['kwargs']['community_id']
        self.community = str(community_id)

        if await self.valid_community(community_id) == True:
            await self.channel_layer.group_add(
                self.community,
                self.channel_name
            )
            await self.accept()
        else:
            raise DenyConnection

    async def disconnect(self, _):
        await self.channel_layer.group_discard(
            self.community,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'chat.send':
            uid = data['user_id']
            username = data['username']
            message = data['message']
            
            success, error = await self.log(uid, message)

            if success == True:
                await self.channel_layer.group_send(
                    self.community,
                    {
                        'type': 'chat.message',
                        'username': username,
                        'message': message
                    }
                )
            else:
                await self.send(json.dumps(
                    {
                        'type': 'chat.error',
                        'error': error
                    }
                ))

    async def chat_message(self, event):
        await self.send(json.dumps(event))

    @sync_to_async
    def valid_community(self, id):
        try:
            Community.objects.get(id = id)
        except Community.DoesNotExist:
            return False
        return True
    
    @sync_to_async
    def log(self, uid, message):
        try:
            user = User.objects.get(uid = uid)
        except User.DoesNotExist:
            try:
                user = User(uid = uid)
                user.full_clean()
                user.save()
            except ValidationError:
                return False, 'Invalid user ID'
        except ValueError:
            return False, 'Invalid user ID'
        
        try:
            log = ChatLog(
                user = user,
                sent_in = self.community,
                message = message
            )
            log.full_clean()
            log.save()
        except ValidationError:
            return False, 'Unable to log message; message not sent'

        return True, None