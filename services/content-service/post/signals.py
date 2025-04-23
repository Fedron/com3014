from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from post.models import Post, Comment
from django.core.cache import cache

@receiver([post_save, post_delete], sender=Post)
def invalidate_post_cache(sender, instance, **kwargs):
    #Invalidate post caches when a post is created, updated or destroyed
    print("Clearing post cache")

    #Clear post list caches
    cache.delete_pattern('*post_detail*')

@receiver([post_save, post_delete], sender=Comment)
def invalidate_comment_cache(sender, instance, **kwargs):
    #Invalidate comment caches when a comment is created, updated or destroyed
    print("Clearing comment cache")

    #Clear post list caches
    cache.delete_pattern('*comment_detail*')