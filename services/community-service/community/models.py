from django.db import models


class Community(models.Model):
    name = models.CharField(max_length=255)
    desc = models.TextField()