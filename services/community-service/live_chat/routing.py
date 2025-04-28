from django.urls import path
from . import consumers


ws_patterns = [
    path('v1/communities/<int:community_id>/chat/', consumers.ChatConsumer.as_asgi()),
]