from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from user.models import User
from .models import ChatLog
from .serializers import ChatLogSerializer


@api_view(['GET'])
def user_logs(request, user_id):
    """
    Returns all the chat messages sent by the user.
    """
    if request.method == 'GET':
        try:
            user = User.objects.get(uid = user_id)
        except User.DoesNotExist:
            try:
                user = User(uid = user_id)
                user.full_clean()
                user.save()
            except ValidationError:
                return Response({'error': 'Invalid user ID'}, status = status.HTTP_400_BAD_REQUEST)
        except (ValueError, ValidationError):
                return Response({'error': 'Invalid user ID'}, status = status.HTTP_400_BAD_REQUEST)

        logs = ChatLog.objects.filter(user = user)
        serializer = ChatLogSerializer(logs, many = True)
        return Response(serializer.data)