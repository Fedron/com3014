from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializers import EventSerializer

# Retrieves List and Create Events
@api_view(['GET', 'POST'])
def event_list_create(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Get the user_id from query parameters
        user_id = request.GET.get('user_id')
        if not user_id:
            return Response({'error': 'Missing user_id query parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            # Save with the user_id provided in the query parameters
            serializer.save(created_by=str(user_id))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, Update, Delete Event
@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, event_id):
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Get the user_id from query parameters
        user_id = request.GET.get('user_id')
        if not user_id:
            return Response({'error': 'Missing user_id query parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check that the provided user_id matches the event creator
        if event.created_by != str(user_id):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Get the user_id from query parameters
        user_id = request.GET.get('user_id')
        if not user_id:
            return Response({'error': 'Missing user_id query parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check that the provided user_id matches the event creator
        if event.created_by != str(user_id):
            return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        event.delete()
        return Response({'message': 'Event deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
