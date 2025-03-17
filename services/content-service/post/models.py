from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    dateCreated = models.DateTimeField(auto_now_add = True)
    #Add once community branch merged
    #community = models.ForeignKey(Community, null = False, blank = False, on_delete = models.CASCADE)