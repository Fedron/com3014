from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from post.models import Post
from django.core.cache import cache

@receiver([post_save, post_delete], sender=Post)
def invalidate_post_cache(sender, instance, **kwargs):
    #Invalidate post list caches when a post is created, updated or destroyed
    print("Clearing post cache")

    #Clear post list caches
    cache.delete_pattern('*post_list*')