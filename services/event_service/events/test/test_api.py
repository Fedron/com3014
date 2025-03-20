import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from events.models import Event

ALGORITHM = "HS256"
# Use your actual secret key from settings
SECRET_KEY = settings.SECRET_KEY

class EventAPITestCase(APITestCase):
    def setUp(self):
        # Generate JWT tokens for two test users
        payload1 = {
            "sub": "test_user_00",  # This token represents test_user_00
            "exp": datetime.utcnow() + timedelta(hours=1),
            "roles": [["community_01", "member"]]
        }
        self.token1 = jwt.encode(payload1, SECRET_KEY, algorithm=ALGORITHM)
        
        payload2 = {
            "sub": "test_user_01",  # This token represents test_user_01
            "exp": datetime.utcnow() + timedelta(hours=1),
            "roles": [["community_01", "member"]]
        }
        self.token2 = jwt.encode(payload2, SECRET_KEY, algorithm=ALGORITHM)

        # Set default authentication as test_user_00 (token1)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token1}")

        # Create a sample event owned by test_user_00
        self.event = Event.objects.create(
            name="Test Event",
            description="A test event",
            event_datetime=datetime.now() + timedelta(days=1),
            deadline=datetime.now() + timedelta(hours=12),
            location="Test Location",
            max_capacity=100,
            created_by="test_user_00",  # Using the token's 'sub'
            joined_count=0
        )

        # Generate URLs using your URL configuration names
        self.event_list_create_url = reverse('events:event-list-create')
        self.event_detail_url = reverse('events:event-detail', kwargs={'event_id': self.event.id})

    def test_get_event_list(self):
        """Test retrieving a list of events."""
        response = self.client.get(self.event_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        # At least one event exists (the one created in setUp)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_event(self):
        """Test creating a new event using JWT auth."""
        new_event_data = {
            "name": "New Event",
            "description": "New event description",
            "event_datetime": (datetime.now() + timedelta(days=2)).isoformat(),
            "deadline": (datetime.now() + timedelta(days=2, hours=12)).isoformat(),
            "location": "New Location",
            "max_capacity": 50,
            "created_by":"test_user_00",
            "joined_count": 0
        }
        response = self.client.post(self.event_list_create_url, new_event_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], new_event_data['name'])
        # Verify the view sets created_by using the token's sub (test_user_00)
        self.assertEqual(response.data['created_by'], "test_user_00")

    def test_get_event_detail(self):
        """Test retrieving a single event's details."""
        response = self.client.get(self.event_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.event.id)

    def test_update_event_authorized(self):
        """Test that the event owner (test_user_00) can update the event."""
        update_data = {
            "name": "Updated Test Event"
        }
        response = self.client.put(self.event_detail_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Updated Test Event")

    def test_update_event_unauthorized(self):
        """Test that a non-owner (test_user_01) cannot update the event."""
        # Change authentication to test_user_01
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token2}")
        update_data = {
            "name": "Malicious Update"
        }
        response = self.client.put(self.event_detail_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_event_authorized(self):
        """Test that the event owner (test_user_00) can delete the event."""
        response = self.client.delete(self.event_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Ensure the event is removed from the database
        self.assertFalse(Event.objects.filter(id=self.event.id).exists())

    def test_delete_event_unauthorized(self):
        """Test that a non-owner (test_user_01) cannot delete the event."""
        # Create another event owned by test_user_00
        another_event = Event.objects.create(
            name="Another Event",
            description="Another test event",
            event_datetime=datetime.now() + timedelta(days=3),
            deadline=datetime.now() + timedelta(hours=10),
            location="Another Location",
            max_capacity=120,
            created_by="test_user_00",
            joined_count=0
        )
        another_event_url = reverse('events:event-detail', kwargs={'event_id': another_event.id})
        
        # Authenticate as test_user_01
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token2}")
        response = self.client.delete(another_event_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # Confirm the event still exists
        self.assertTrue(Event.objects.filter(id=another_event.id).exists())
