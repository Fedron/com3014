from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

class PostListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        community_id = self.kwargs['community_id']
        return Post.objects.filter(community=community_id)

class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_url_kwarg = "post_id"

class CommentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        post_id = self.kwargs['post_id']
        post = Post.objects.get(pk=post_id)
        return Comment.objects.filter(post=post_id)

class CommentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_url_kwarg = "comment_id"

# @api_view(['GET', 'POST'])
# def post_list_create(request, community_id):
#     """
#     Provides a list of all posts of this community, or creates a new one.
#     """
#     if request.method == 'GET':
#         posts = Post.objects.filter(community = community_id)
#         serializer = PostSerializer(posts, many = True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         user_id = request.GET.get('user_id')
#         if not user_id:
#             return Response({'error': 'Missing user_id query parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = PostSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save(created_by = str(user_id), community = str(community_id))
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def post_details(request, post_id):
#     """
#     Retrieve, update and delete requests using a provided post id.
#     """
#     try:
#         post = Post.objects.get(id = post_id)
#     except Post.DoesNotExist:
#         return Response({'error': 'No post with given id found'}, status = status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = PostSerializer(post)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = PostSerializer(post, data = request.data, partial = True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         post.delete()
#         return Response(status = status.HTTP_204_NO_CONTENT)
    
# @api_view(['GET', 'POST'])
# def comment_list_create(request, post_id):
#     """
#     Provides a list of all comments of this post, or creates a new one.
#     """
#     if request.method == 'GET':
#         comments = Comment.objects.filter(post = post_id)
#         serializer = CommentSerializer(comments, many = True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         user_id = request.GET.get('user_id')
#         if not user_id:
#             return Response({'error': 'Missing user_id query parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = CommentSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save(created_by = str(user_id), post = str(post_id))
#             return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
# @api_view(['GET', 'PUT', 'DELETE'])
# def comment_details(request, comment_id):
#     """
#     Retrieve, update and delete requests using a provided comment id.
#     """
#     try:
#         comment = Post.objects.get(id = comment_id)
#     except Post.DoesNotExist:
#         return Response({'error': 'No comment with given id found'}, status = status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = PostSerializer(comment)
#         return Response(serializer.data)
    
#     elif request.method == 'PUT':
#         serializer = CommentSerializer(comment, data = request.data, partial = True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
#     elif request.method == 'DELETE':
#         comment.delete()
#         return Response(status = status.HTTP_204_NO_CONTENT)