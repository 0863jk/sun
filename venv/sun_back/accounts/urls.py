from django.urls import path
from . import views

user_list = views.UserViewSet.as_view({'get': 'list', 'post': 'create'})
user_detail = views.UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})

urlpatterns = [
    path('info', user_list),
    path('info/<str:pk>', user_detail),
    path('search', views.UserViewSet.as_view({'get': 'searchUserByUsername'})),

    path('userdatas/', views.getUserDatas, name="userdatas"),
    # path('getUsername/', views.getUsername, name="getUsername"),
    # path('getUsername/<str:username>', views.getUsername, name="getUsername"),
    # path('postUser/', views.postUser, name="postUser"),
    # path('searchTrainerUser/<str:username>', views.searchTrainerUser, name="searchUser"),
]