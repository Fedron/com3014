from django.db import models


class User(models.Model):
    uid = models.UUIDField(primary_key = True, editable = False)
