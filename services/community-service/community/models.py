from django.db import models
from user.models import User


class Community(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()
    members = models.ManyToManyField(User, blank = True)

    def community_size(self):
        return len(self.members.all())