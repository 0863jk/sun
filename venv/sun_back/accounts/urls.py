from django.urls import path
from . import views

urlpatterns = [
    path('userdatas/', views.getUserDatas, name="userdatas"),
    path('getUsername/', views.getUsername, name="getUsername"),
    path('postUser/', views.postUser, name="postUser"),
    path('searchUser/<str:username>', views.searchUser, name="searchUser"),
]