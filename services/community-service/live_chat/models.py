from django.db import models
from user.models import User


class ChatLog(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    sent = models.DateTimeField(auto_now_add = True)
    sent_in = models.IntegerField(null = False)
    message = models.TextField(null = False, blank = False)