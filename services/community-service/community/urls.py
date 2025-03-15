from django.urls import path
from .views import community_list_create, community_details

app_name = 'community'

urlpatterns = [
    path('', community_list_create, name = 'community-list-create'),
    path('<int:community_id>/', community_details, name = 'community-details')
]