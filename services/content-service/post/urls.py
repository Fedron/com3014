from django.urls import path
from .views import post_list_create, post_details, comment_list_create, comment_details

app_name = 'post'

urlpatterns = [
    path('<int:community_id>/', post_list_create, name = 'post-list-create'),
    path('<int:post_id>/', post_details, name = 'post-details'),
    path('<int:post_id>/comment/', comment_list_create, name = 'comment-list-create'),
    path('<int:comment_id>/', comment_details, name = 'comment-details')
]