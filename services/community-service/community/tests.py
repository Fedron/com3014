import json
from django.test import TestCase, Client
from .models import Community


class CommunityTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        community = Community(name = 'testCommunity')
        community.full_clean()
        community.save()
        self.community = community

    def test_list_communities(self):
        response = self.client.get('/v1/communities/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['id'], self.community.id)
        self.assertEqual(response.json()[0]['name'], self.community.name)
        self.assertEqual(response.json()[0]['desc'], self.community.desc)
        self.assertEqual(response.json()[0]['members'], len(self.community.members.all()))

    def test_create_community(self):
        valid = {'name': 'newTestCommunity', 'desc': ''}
        response = self.client.post('/v1/communities/', valid)
        community = Community.objects.get(id = response.json()['id'])
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['name'], community.name)
        self.assertEqual(response.json()['desc'], community.desc)
        self.assertEqual(response.json()['members'], len(community.members.all()))

        invalid = {}
        response = self.client.post('/v1/communities/', invalid)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Invalid input')

        invalid = {'members': 69}
        response = self.client.post('/v1/communities/', invalid)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Do not attempt to define members field')

    def test_get_community(self):
        response = self.client.get('/v1/communities/' + str(self.community.id) + '/')
        self.assertEqual(response.status_code, 200)
       
        self.assertEqual(response.json()['id'], self.community.id)
        self.assertEqual(response.json()['name'], self.community.name)
        self.assertEqual(response.json()['desc'], self.community.desc)
        self.assertEqual(response.json()['members'], len(self.community.members.all()))

    def test_update_community(self):
        valid = {'name': 'newTestCommunity', 'desc': 'test'}
        response = self.client.put('/v1/communities/' + str(self.community.id) + '/', json.dumps(valid), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)
        community = Community.objects.get(id = self.community.id)
        self.assertEqual(response.json()['name'], community.name)
        self.assertEqual(response.json()['desc'], community.desc)
        self.assertEqual(response.json()['members'], len(community.members.all()))
        self.assertEqual(community.name, valid['name'])
        self.assertEqual(community.desc, valid['desc'])

        invalid = {'members': 69}
        response = self.client.put('/v1/communities/' + str(self.community.id) + '/', json.dumps(invalid), content_type = 'application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Do not attempt to define members field')

    def test_delete_community(self):
        response = self.client.delete('/v1/communities/' + str(self.community.id) + '/')
        self.assertEqual(response.status_code, 204)
        with self.assertRaises(Community.DoesNotExist):
            Community.objects.get(id = self.community.id)
        response = self.client.delete('/v1/communities/' + str(self.community.id) + '/')
        self.assertEqual(response.status_code, 404)
        