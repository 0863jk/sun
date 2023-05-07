from django.urls import path
from . import views

urlpatterns = [
    path('userdatas/', views.getUserDatas, name="userdatas"),
    path('getUsername/', views.getUsername, name="userdatas"),
    path('postUser/', views.postUser, name="postUser"),
    path('login/', views.login, name="login"),
]