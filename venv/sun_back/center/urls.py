from django.urls import path
from . import views

urlpatterns = [
    path('getCenters/', views.getCenters, name="getCenters"),
    path('getCenter/<str:centerid>', views.getCenter, name="getCenter"),
    path('searchCenter/<str:centerid>', views.searchCenter, name="searchCenter"),
    path('getAllCenterMember/', views.getAllCenterMember, name="getAllCenterMember"),
    path('getMemberCenters/<str:username>', views.getMemberCenters, name="getMemberCenters"),
    path('getCenterTrainers/<str:centerid>', views.getCenterTrainers, name="getCenterTrainers"),
    path('registerCenter/', views.registerCenter, name="registerCenter"),
    path('registerCenterMember/', views.registerCenterMember, name="registerCenterMember"),
    path('plan/getPlans/', views.getPlans, name="getPlans"),
    path('plan/getCenterPlans/<str:centerid>', views.getCenterPlans, name="getCenterPlans"),
    path('plan/getMemberPlan/<str:centerid>/<str:username>', views.getMemberPlan, name="getMemberPlan"),
    path('plan/registerPlan/', views.registerPlan, name="registerCenterPlan"),
    path('lesson/getCenterLesson/<str:centerid>', views.getCenterLesson, name="getCenterLesson"),
    path('lesson/registerLesson/', views.registerLesson, name="registerLesson"),
    path('timetable/getTimetable/<str:centerid>', views.getTimetable, name="getTimetable"),
    path('timetable/registerTimetable/', views.registerTimetable, name="registerTimetable"),
]