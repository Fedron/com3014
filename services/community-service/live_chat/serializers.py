from rest_framework import serializers
from .models import ChatLog


class ChatLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatLog
        fields = ['message', 'sent', 'sent_in']