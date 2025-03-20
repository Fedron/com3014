from django.core.management.base import BaseCommand
from django.db import connection
from events.models import Event
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = "Seeds the database with 10 sample events with realistic locations"

    def handle(self, *args, **kwargs):
        # Clear existing Event data
        Event.objects.all().delete()

        # Reset the ID sequence (for SQLite)
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='events_event';")
        self.stdout.write(self.style.WARNING("Deleted existing events and reset ID counter."))

        # Define test user identifiers
        user0 = "test_user_00"
        user1 = "test_user_01"

        # Base date for events: starting tomorrow
        base_date = datetime.now() + timedelta(days=1)

        event1 = Event(
            name="Django Workshop",
            description="An introductory workshop to Django, covering models, views, and templates.",
            event_datetime=base_date,
            deadline=base_date - timedelta(hours=12),
            location="New York, NY, USA",
            max_capacity=120,
            created_by=user0,
            joined_count=0
        )

        event2 = Event(
            name="Python Meetup",
            description="A meetup for Python enthusiasts to discuss best practices and new libraries.",
            event_datetime=base_date + timedelta(days=1),
            deadline=(base_date + timedelta(days=1)) - timedelta(hours=12),
            location="San Francisco, CA, USA",
            max_capacity=80,
            created_by=user1,
            joined_count=0
        )

        event3 = Event(
            name="Data Science Conference",
            description="Learn the latest in data science and machine learning trends.",
            event_datetime=base_date + timedelta(days=2),
            deadline=(base_date + timedelta(days=2)) - timedelta(hours=12),
            location="London, UK",
            max_capacity=200,
            created_by=user0,
            joined_count=0
        )

        event4 = Event(
            name="AI Symposium",
            description="Discuss breakthroughs and ethical considerations in AI.",
            event_datetime=base_date + timedelta(days=3),
            deadline=(base_date + timedelta(days=3)) - timedelta(hours=12),
            location="Paris, France",
            max_capacity=150,
            created_by=user1,
            joined_count=0
        )

        event5 = Event(
            name="Tech Expo",
            description="Showcase of innovative tech solutions from startups around the world.",
            event_datetime=base_date + timedelta(days=4),
            deadline=(base_date + timedelta(days=4)) - timedelta(hours=12),
            location="Tokyo, Japan",
            max_capacity=250,
            created_by=user0,
            joined_count=0
        )

        event6 = Event(
            name="Cybersecurity Seminar",
            description="A seminar on the latest trends in cybersecurity and data protection.",
            event_datetime=base_date + timedelta(days=5),
            deadline=(base_date + timedelta(days=5)) - timedelta(hours=12),
            location="Berlin, Germany",
            max_capacity=100,
            created_by=user1,
            joined_count=0
        )

        event7 = Event(
            name="Cloud Computing Conference",
            description="Dive into cloud computing with experts from top tech companies.",
            event_datetime=base_date + timedelta(days=6),
            deadline=(base_date + timedelta(days=6)) - timedelta(hours=12),
            location="Toronto, Canada",
            max_capacity=180,
            created_by=user0,
            joined_count=0
        )

        event8 = Event(
            name="Mobile App Development Workshop",
            description="Hands-on workshop focused on building mobile applications.",
            event_datetime=base_date + timedelta(days=7),
            deadline=(base_date + timedelta(days=7)) - timedelta(hours=12),
            location="Sydney, Australia",
            max_capacity=90,
            created_by=user1,
            joined_count=0
        )

        event9 = Event(
            name="Blockchain Summit",
            description="Explore blockchain technology and its applications in various industries.",
            event_datetime=base_date + timedelta(days=8),
            deadline=(base_date + timedelta(days=8)) - timedelta(hours=12),
            location="Dubai, UAE",
            max_capacity=220,
            created_by=user0,
            joined_count=0
        )

        event10 = Event(
            name="Startup Pitch Night",
            description="An evening for startups to pitch their ideas to investors and mentors.",
            event_datetime=base_date + timedelta(days=9),
            deadline=(base_date + timedelta(days=9)) - timedelta(hours=12),
            location="Singapore",
            max_capacity=130,
            created_by=user1,
            joined_count=0
        )

        # Save all events at once
        Event.objects.bulk_create([
            event1, event2, event3, event4, event5,
            event6, event7, event8, event9, event10
        ])

        self.stdout.write(self.style.SUCCESS("Successfully seeded database with 10 events!"))
