import uuid
from django.test import TestCase, Client
from community.models import Community
from .models import User


class UserTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        user = User(uid = uuid.uuid4())
        user.full_clean()
        user.save()
        self.user = user
        community = Community(name = 'testCommunity')
        community.full_clean()
        community.save()
        self.community = community

    def test_user_details(self):
        print('/v1/user/' + str(self.user.uid) + '/')
        response = self.client.get('/v1/user/' + str(self.user.uid) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['user_id'], str(self.user.uid))
        self.assertEqual(response.json()['communities'], [])

    def test_delete_user(self):
        response = self.client.delete('/v1/user/' + str(self.user.uid) + '/')
        self.assertEqual(response.status_code, 204)
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(uid = self.user.uid)
        response = self.client.delete('/v1/user/' + str(self.user.uid) + '/')
        self.assertEqual(response.status_code, 404)

    def test_community_membership(self):
        valid = {'user_id': str(self.user.uid), 'community_id': self.community.id}
        members = len(self.community.members.all())
        response = self.client.post('/v1/user/join/', valid)
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/v1/user/' + str(self.user.uid) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['communities'][0]['id'], self.community.id)
        self.assertEqual(response.json()['communities'][0]['members'], members + 1)
        response = self.client.get('/v1/communities/' + str(self.community.id) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['members'], members + 1)

        response = self.client.post('/v1/user/leave/', valid)
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/v1/user/' + str(self.user.uid) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['communities'], [])
        response = self.client.get('/v1/communities/' + str(self.community.id) + '/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['members'], members)

        invalid = {'user_id': 'hello', 'community_id': self.community.id}
        response = self.client.post('/v1/user/join/', invalid)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Invalid user ID')
        response = self.client.post('/v1/user/leave/', invalid)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Invalid user ID')

        invalid = {'user_id': str(self.user.uid), 'community_id': 69}
        response = self.client.post('/v1/user/join/', invalid)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['error'], 'No community with given id found')
        response = self.client.post('/v1/user/leave/', invalid)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['error'], 'No community with given id found')
