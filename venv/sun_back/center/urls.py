# from django.urls import path
# from center import views

# app_name = 'center'

# urlpatterns = [
#     path('getCenters/', views.CenterViewSet.as_view({'get': 'list'}), name="getCenters"),
#     path('getCenter/<str:pk>', views.CenterViewSet.as_view({'get': 'retrieve'}), name="getCenter"),
#     path('searchCenter', views.CenterViewSet.as_view({'get': 'search'}), name="searchCenter"),
#     path('registerCenter/', views.CenterViewSet.as_view({'post': 'register'}), name="registerCenter"),
    
#     path('plan/getPlans/', views.PlanViewSet.as_view({'get': 'list'}), name="getPlans"),
#     path('plan/getCenterPlans/<str:centerid>', views.PlanViewSet.as_view({'get': 'getCenterPlans'}), name="getPlans"),
#     path('plan/getMemberPlan', views.PlanViewSet.as_view({'get': 'getMemberPlan'}), name="getMemberPlan"),
#     # path('plan/getPlans/', views.PlanViewSet.as_view({'get': 'getCenterPlan'}), name="getCenterPlan"),
# ]

from django.urls import path
from . import views

urlpatterns = [
    path('getCenters/', views.getCenters, name="getCenters"),
    path('getCenter/<str:centerid>', views.getCenter, name="getCenter"),
    path('searchCenter/<str:centerid>', views.searchCenter, name="searchCenter"),
    path('getAllCenterMember/', views.getAllCenterMember, name="getAllCenterMember"),
    path('getMemberCenters/<str:username>', views.getMemberCenters, name="getMemberCenters"),
    path('getCenterTrainers/<str:centerid>', views.getCenterTrainers, name="getCenterTrainers"),
    path('getCenterMembers/<str:centerid>', views.getCenterMembers, name="getCenterMembers"),
    path('registerCenter/', views.registerCenter, name="registerCenter"),
    
    path('registerCenterMember/', views.registerCenterMember, name="registerCenterMember"),

    path('plan/getPlans/', views.getPlans, name="getPlans"),
    path('plan/getPlan/<str:planid>', views.getPlan, name="getPlan"),
    path('plan/getCenterPlans/<str:centerid>', views.getCenterPlans, name="getCenterPlans"),
    path('plan/getMemberPlan/<str:centerid>/<str:username>', views.getMemberPlan, name="getMemberPlan"),
    path('plan/registerPlan/', views.registerPlan, name="registerCenterPlan"),
    
    path('lesson/getCenterLesson/<str:centerid>', views.getCenterLesson, name="getCenterLesson"),
    path('lesson/registerLesson/', views.registerLesson, name="registerLesson"),

    path('timetable/getCenterTimetable/<str:centerid>', views.getCenterTimetable, name="getCenterTimetable"),
    path('timetable/getTimetableBlock/<str:blockid>', views.getTimetableBlock, name="getTimetableBlock"),
    path('timetable/registerTimetableBlock/', views.registerTimetableBlock, name="registerTimetableBlock"),
    path('timetable/updateTimetableBlock/', views.updateTimetableBlock, name="updateTimetableBlock"),
    path('timetable/getMemberLessonHistory/', views.getMemberLessonHistory, name="getMemberLessonHistory"),
    
    path('enrolment/getEnrolments/', views.getEnrolments, name="getEnrolments"),
    path('enrolment/getEnrolment/<str:blockid>', views.getEnrolment, name="getEnrolment"),
    path('enrolment/registerEnrolment/<str:centerid>/<str:userid>', views.registerEnrolment, name="registerEnrolment"),
]