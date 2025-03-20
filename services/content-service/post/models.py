from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField()
    dateCreated = models.DateTimeField(auto_now_add = True)
    communityId = models.IntegerField()
    userId = models.IntegerField()
    #Add once community branch merged

class Comment(models.Model):
    userId = models.IntegerField()
    replyTo = models.ForeignKey()
    description = models.CharField()
    dateCreated = models.DateTimeField(auto_now_add = True)