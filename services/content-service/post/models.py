from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add = True)
    community = models.IntegerField()
    created_by = models.CharField(max_length=255)
    #Add once community branch merged

class Comment(models.Model):
    created_by = models.CharField(max_length=255)
    reply_to = models.ForeignKey()
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add = True)