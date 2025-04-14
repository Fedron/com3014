from datetime import datetime, timedelta
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from events.models import Event

class EventAPITestCase(APITestCase):
    def setUp(self):
        # Create a sample event owned by test_user_00
        self.event = Event.objects.create(
            name="Test Event",
            description="A test event",
            event_datetime=datetime.now() + timedelta(days=1),
            deadline=datetime.now() + timedelta(hours=12),
            location="Test Location",
            max_capacity=100,
            created_by="test_user_00",  # Using a simple user identifier
            joined_count=0
        )

        # Generate URLs using your URL configuration names
        self.event_list_create_url = reverse('events:event-list-create')
        self.event_detail_url = reverse('events:event-detail', kwargs={'event_id': self.event.id})

    def test_get_event_list(self):
        """Test retrieving a list of events."""
        # For GET, query parameter is optional; our view doesn't require user_id on GET
        response = self.client.get(self.event_list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)
        # At least one event exists (the one created in setUp)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_event(self):
        """Test creating a new event using query parameter for user_id."""
        new_event_data = {
            "name": "New Event",
            "description": "New event description",
            "event_datetime": (datetime.now() + timedelta(days=2)).isoformat(),
            "deadline": (datetime.now() + timedelta(days=2, hours=12)).isoformat(),
            "location": "New Location",
            "max_capacity": 50,
            "created_by": "test_user_00",  # This value will be overridden by the query parameter
            "joined_count": 0
        }
        # Append the user_id as a query parameter
        url = f"{self.event_list_create_url}?user_id=test_user_00"
        response = self.client.post(url, new_event_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], new_event_data['name'])
        # Verify that the created event's 'created_by' is set to test_user_00 from the query parameter
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
        # Use the query parameter for user_id
        url = f"{self.event_detail_url}?user_id=test_user_00"
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Updated Test Event")

    def test_update_event_unauthorized(self):
        """Test that a non-owner (test_user_01) cannot update the event."""
        update_data = {
            "name": "Malicious Update"
        }
        # Use test_user_01 as the user_id, which should be unauthorized
        url = f"{self.event_detail_url}?user_id=test_user_01"
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_event_authorized(self):
        """Test that the event owner (test_user_00) can delete the event."""
        url = f"{self.event_detail_url}?user_id=test_user_00"
        response = self.client.delete(url)
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
        
        # Use test_user_01 as the user_id in the query parameter
        url = f"{another_event_url}?user_id=test_user_01"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # Confirm the event still exists
        self.assertTrue(Event.objects.filter(id=another_event.id).exists())
