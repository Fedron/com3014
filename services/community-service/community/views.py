from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Community
from .serializers import CommunitySerializer


@api_view(['GET', 'POST'])
def community_list_create(request):
    """
    Provides a list of all communities or creates a new one.
    """
    if request.method == 'GET':
        communities = Community.objects.all()
        serializer = CommunitySerializer(communities, many = True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = CommunitySerializer(data = request.data)
        print(request.data)
        if serializer.is_valid():
            print(serializer)
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def community_details(request, community_id):
    """
    Retrieve, update and delete requests using a provided community id.
    """
    try:
        community = Community.objects.get(id = community_id)
    except Community.DoesNotExist:
        return Response({'error': 'No community with given id found'}, status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CommunitySerializer(community)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CommunitySerializer(community, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        community.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)