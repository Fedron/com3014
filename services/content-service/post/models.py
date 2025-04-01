from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add = True, null=False, blank=False)
    community = models.CharField(max_length=255, null=False, blank=False)
    created_by = models.CharField(max_length=255, null=False, blank=False)
    #Add once community branch merged

class Comment(models.Model):
    created_by = models.CharField(max_length=255, null=False, blank=False)
    post = models.ForeignKey(Post, null=False, blank=False, on_delete=models.CASCADE)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add = True, null=False, blank=False)
    reply_to = models.ForeignKey("self", null=True, blank=False, on_delete=models.SET_NULL)