from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    event_datetime = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=255)
    created_by = models.CharField(max_length=255)  # Stores user identifier from JWT
    deadline = models.DateTimeField(null=True, blank=True)  # Registration deadline
    max_capacity = models.PositiveIntegerField()
    joined_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
