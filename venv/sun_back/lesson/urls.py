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
    path('timetableblock/center/<str:centerid>', views.TimetableBlockViewSet.as_view({'get': 'getCenterTimetable'}), name="getCenterTimetable"),
    path('timetableblock/general/<str:userid>', views.TimetableBlockViewSet.as_view({'get': 'getMemberTimetable'}), name="getMemberTimetable"),
    path('timetableblock/trainer/<str:userid>', views.TimetableBlockViewSet.as_view({'get': 'getTrainerTimetable'}), name="getTrainerTimetable"),
    path('timetableblock/history/trainer', views.TimetableBlockViewSet.as_view({'get': 'getTrainerHistory'}), name="getTrainerHistory"),
    path('timetableblock/history/general', views.TimetableBlockViewSet.as_view({'get': 'getMemberHistory'}), name="getMemberHistory"),

    path('enrolment/list', views.EnrolmentViewSet.as_view({'get': 'list'}), name="getEnrolments"),
    path('enrolment/retrieve/<str:pk>', views.EnrolmentViewSet.as_view({'get': 'retrieve'}), name="getEnrolment"),
    path('enrolment/register', views.EnrolmentViewSet.as_view({'post': 'register'}), name="registerEnrolment"),
    path('enrolment/applicant', views.EnrolmentViewSet.as_view({'get': 'getApplicants'}), name="getApplicants"),
    
    path('lessonreview/list', views.LessonReviewViewSet.as_view({'get': 'list'}), name="getLessonReviews"),
    path('lessonreview/retrieve/<str:pk>', views.LessonReviewViewSet.as_view({'get': 'retrieve'}), name="getLessonReview"),
    path('lessonreview/register', views.LessonReviewViewSet.as_view({'post': 'register'}), name="registerLessonReview"),
    path('lessonreview/get', views.LessonReviewViewSet.as_view({'get': 'getBlockReview'}), name="getLessonReview"),
        
]