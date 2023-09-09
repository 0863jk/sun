from django.urls import path
from center import views

app_name = 'center'

urlpatterns = [
    path('list', views.CenterViewSet.as_view({'get': 'get'}), name="getCenters"),
    path('retrieve/<str:pk>', views.CenterViewSet.as_view({'get': 'get_object'}), name="getCenter"),
    path('search', views.CenterViewSet.as_view({'get': 'search'}), name="searchCenter"),
    path('register', views.CenterViewSet.as_view({'post': 'put'}), name="registerCenter"),
    
    path('plan/list', views.PlanViewSet.as_view({'get': 'list'}), name="getPlans"),
    path('plan/retrieve/<str:pk>', views.PlanViewSet.as_view({'get': 'getCenterPlans'}), name="getPlans"),
    path('plan/register', views.PlanViewSet.as_view({'post': 'register'}), name="registerCenter"),
    path('plan/get/<str:centerid>', views.PlanViewSet.as_view({'get': 'getCenterPlans'}), name="getCenterPlans"),
    path('plan/get', views.PlanViewSet.as_view({'get': 'getMemberPlan'}), name="getMemberPlan"),

    path('member/list', views.MemberViewSet.as_view({'get': 'list'}), name="getCenterMember"),
    path('member/retrieve/<str:pk>', views.MemberViewSet.as_view({'get': 'list'}), name="getCenterMember"),
    path('member/register', views.MemberViewSet.as_view({'post': 'register'}), name="getCenterMember"),
    path('member/centerlist', views.MemberViewSet.as_view({'get': 'getMemberCenters'}), name="getMemberCenters"),
    path('member', views.MemberViewSet.as_view({'get': 'getMembers'}), name="getMembers"),
    path('member/get', views.MemberViewSet.as_view({'get': 'getMembersByRole'}), name="getMembersByRole"),
    path('member/registerinfo', views.MemberViewSet.as_view({'get': 'getRegisterInfo'}), name="getRegisterInfo"),
]

# from django.urls import path
# from . import views

# urlpatterns = [
#     path('getCenters/', views.getCenters, name="getCenters"),
#     path('getCenter/<str:centerid>', views.getCenter, name="getCenter"),
#     path('searchCenter/<str:centerid>', views.searchCenter, name="searchCenter"),
#     path('getAllCenterMember/', views.getAllCenterMember, name="getAllCenterMember"),
#     path('getMemberCenters/<str:username>', views.getMemberCenters, name="getMemberCenters"),
#     path('getCenterTrainers/<str:centerid>', views.getCenterTrainers, name="getCenterTrainers"),
#     path('getCenterMembers/<str:centerid>', views.getCenterMembers, name="getCenterMembers"),
#     path('registerCenter/', views.registerCenter, name="registerCenter"),
    
#     path('registerCenterMember/', views.registerCenterMember, name="registerCenterMember"),

#     path('plan/getPlans/', views.getPlans, name="getPlans"),
#     path('plan/getPlan/<str:planid>', views.getPlan, name="getPlan"),
#     path('plan/getCenterPlans/<str:centerid>', views.getCenterPlans, name="getCenterPlans"),
#     path('plan/getMemberPlan/<str:centerid>/<str:username>', views.getMemberPlan, name="getMemberPlan"),
#     path('plan/registerPlan/', views.registerPlan, name="registerCenterPlan"),
    
#     path('lesson/getCenterLesson/<str:centerid>', views.getCenterLesson, name="getCenterLesson"),
#     path('lesson/registerLesson/', views.registerLesson, name="registerLesson"),

#     path('timetable/getCenterTimetable/<str:centerid>', views.getCenterTimetable, name="getCenterTimetable"),
#     path('timetable/getTimetableBlock/<str:blockid>', views.getTimetableBlock, name="getTimetableBlock"),
#     path('timetable/registerTimetableBlock/', views.registerTimetableBlock, name="registerTimetableBlock"),
#     path('timetable/updateTimetableBlock/', views.updateTimetableBlock, name="updateTimetableBlock"),
#     path('timetable/getMemberLessonHistory/<str:centerid>/<str:userid>', views.getMemberLessonHistory, name="getMemberLessonHistory"),
    
#     path('enrolment/getEnrolments/', views.getEnrolments, name="getEnrolments"),
#     path('enrolment/getEnrolment/<str:blockid>', views.getEnrolment, name="getEnrolment"),
#     path('enrolment/registerEnrolment/<str:centerid>/<str:userid>', views.registerEnrolment, name="registerEnrolment"),
# ]