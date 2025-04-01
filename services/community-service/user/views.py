from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from .models import User
from community.models import Community
from community.serializers import CommunitySerializer


@api_view(['GET', 'DELETE'])
def user_details(request, user_id):
    """
    GET: Returns a list of ids for each community the given member is part of.

    DELETE: Deletes the user object.
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

        communities = user.community_set.all()
        serializer = CommunitySerializer(communities, many = True)

        response = {
            'user_id': user_id,
            'communities': serializer.data
        }

        return Response(response)
    
    elif request.method == 'DELETE':
        try:
            user = User.objects.get(uid = user_id)
        except User.DoesNotExist:
            return Response({'error': 'Object with given UID not found'}, status = status.HTTP_404_NOT_FOUND)
        
        user.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def user_join_community(request):
    """
    User with given user_id joins community with given community_id.
    """
    if request.method == 'POST':
        uid = request.POST.get('user_id')
        cid = request.POST.get('community_id')

        try:
            user = User.objects.get(uid = uid)
        except User.DoesNotExist:
            try:
                user = User(uid = uid)
                user.full_clean()
                user.save()
            except ValidationError:
                    return Response({'error': 'Invalid user ID'}, status = status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Invalid user ID'}, status = status.HTTP_400_BAD_REQUEST)
            
        try:
            community = Community.objects.get(id = cid)
        except Community.DoesNotExist:
            return Response({'error': 'No community with given id found'}, status = status.HTTP_404_NOT_FOUND)
        
        community.members.add(user)
        return Response(status = status.HTTP_200_OK)
    
@api_view(['POST'])
def user_leave_community(request):
    """
    User with given user_id leaves community with given community_id.
    """
    if request.method == 'POST':
        uid = request.POST.get('user_id')
        cid = request.POST.get('community_id')

        try:
            user = User.objects.get(uid = uid)
        except User.DoesNotExist:
            try:
                user = User(uid = uid)
                user.full_clean()
                user.save()
            except ValidationError:
                    return Response({'error': 'Invalid user ID'}, status = status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': 'Invalid user ID'}, status = status.HTTP_400_BAD_REQUEST)
            
        try:
            community = Community.objects.get(id = cid)
        except Community.DoesNotExist:
            return Response({'error': 'No community with given id found'}, status = status.HTTP_404_NOT_FOUND)
        
        community.members.remove(user)
        return Response(status = status.HTTP_200_OK)