"""
URL configuration for antto_community project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include
from community.views import community_details, community_list_create
from user.views import user_details, user_join_community, user_leave_community
from live_chat.views import user_logs

v1_patterns = [
    path('communities/', community_list_create, name = 'community-list-create'),
    path('communities/<int:community_id>/', community_details, name = 'community-details'),
    path('user/<int:user_id>/', user_details, name = 'user-details'),
    path('user/<int:user_id>/logs/', user_logs, name = 'user-logs'),
    path('user/join/', user_join_community, name = 'user-join-community'),
    path('user/leave/', user_leave_community, name = 'user-leave-community'),
]

urlpatterns = [
    path('v1/', include(v1_patterns)),
]
