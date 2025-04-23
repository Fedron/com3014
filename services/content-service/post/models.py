from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add = True, null=False, blank=False)
    community = models.CharField(max_length=255, null=False, blank=False)
    created_by = models.CharField(max_length=255, null=False, blank=False)
    likes = models.IntegerField(null=False, blank=False, default=0)
    attached_file = models.FileField(upload_to='uploads', null=True, blank=True)
    #Add once community branch merged

class Comment(models.Model):
    created_by = models.CharField(max_length=255, null=False, blank=False)
    post = models.ForeignKey(Post, null=False, blank=False, on_delete=models.CASCADE)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add = True, null=False, blank=False)
    reply_to = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)
    likes = models.IntegerField(null=False, blank=False, default=0)