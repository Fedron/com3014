"""
URL configuration for content project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from post.views import *

v1_patterns = [
    path('posts/list/<int:community_id>/', PostListCreateAPIView.as_view(), name = 'post-list-create'),
    path('posts/list/all/', PostListAllAPIView.as_view(), name = 'post-list-all'),
    path('posts/<int:post_id>/', PostDetailAPIView.as_view(), name = 'post-details'),
    path('comments/list/<int:post_id>/', CommentListCreateAPIView.as_view(), name = 'comment-list-create'),
    path('comments/<int:comment_id>/', CommentDetailAPIView.as_view(), name = 'comment-details'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('__debug__/', include("debug_toolbar.urls")),
    path('v1/', include(v1_patterns)),
]
