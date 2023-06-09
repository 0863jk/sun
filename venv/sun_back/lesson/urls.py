from django.urls import path
from lesson import views

app_name = 'lesson'

urlpatterns = [
    path('list', views.LessonViewSet.as_view({'get': 'list'}), name="getLessons"),
    path('retrieve/<str:pk>', views.LessonViewSet.as_view({'get': 'retrieve'}), name="getLesson"),
    path('register', views.LessonViewSet.as_view({'post': 'register'}), name="registerLesson"),
    path('get/<str:centerid>', views.LessonViewSet.as_view({'get': 'getCenterLessons'}), name="getCenterLessons"),
    
    path('timetableblock/list', views.TimetableBlockViewSet.as_view({'get': 'list'}), name="getTimetableBlock"),
    path('timetableblock/retrieve/<str:pk>', views.TimetableBlockViewSet.as_view({'get': 'retrieve'}), name="getTimetableBlock"),
    path('timetableblock/register', views.TimetableBlockViewSet.as_view({'post': 'register'}), name="registerTimetableBlock"),
    path('timetableblock/update', views.TimetableBlockViewSet.as_view({'put': 'update'}), name="updateTimetableBlock"),
    path('timetableblock/get/<str:centerid>', views.TimetableBlockViewSet.as_view({'get': 'getCenterTimetable'}), name="getCenterTimetable"),

    path('enrolment/list', views.EnrolmentViewSet.as_view({'get': 'list'}), name="getEnrolments"),
    path('enrolment/retrieve/<str:pk>', views.EnrolmentViewSet.as_view({'get': 'retrieve'}), name="getEnrolment"),
    path('enrolment/register', views.EnrolmentViewSet.as_view({'post': 'register'}), name="registerEnrolment"),
    path('enrolment/applicant', views.EnrolmentViewSet.as_view({'post': 'getApplicants'}), name="getApplicants"),
    
]