from rest_framework import serializers
from .models import Community


class CommunitySerializer(serializers.ModelSerializer):
    members = serializers.IntegerField(source = 'community_size', required = False)

    class Meta:
        model = Community
        fields = ['id', 'name', 'desc', 'members']