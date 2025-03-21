from django.urls import path
from .views import post_list_create, post_details

app_name = 'post'

urlpatterns = [
    path('<int:community_id>', post_list_create, name = 'post-list-create'),
    path('<int:post_id>/', post_details, name = 'post-details')
]