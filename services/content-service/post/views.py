from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FormParser, MultiPartParser
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.http import Http404

#Provides a list of all posts of this community, or creates a new one.
class PostListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    parser_classes = [FormParser, MultiPartParser]
    
    def get_queryset(self):
        community_id = self.kwargs['community_id']
        post_list = Post.objects.filter(community=community_id)
        if post_list.count() == 0:
            raise Http404
        else:
            return post_list

#Retrieve, update and delete requests using a provided post id.
class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = [FormParser, MultiPartParser]
    lookup_url_kwarg = "post_id"

    #Cache GET request with TTL of 60 mins
    @method_decorator(cache_page(60 * 60, key_prefix='post_detail'))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

#Provides a list of all comments of this post, or creates a new one.
class CommentListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        post_id = self.kwargs['post_id']
        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            raise Http404
        return Comment.objects.filter(post=post)

#Retrieve, update and delete requests using a provided comment id.
class CommentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_url_kwarg = "comment_id"

    #Cache GET request with TTL of 60 mins
    @method_decorator(cache_page(60 * 60, key_prefix='comment_detail'))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
