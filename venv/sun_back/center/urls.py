from django.urls import path
from . import views

urlpatterns = [
    path('getCenters/', views.getCenters, name="getCenters"),
    path('getCenter/<str:centerid>', views.getCenter, name="getCenter"),
    path('searchCenter/<str:centerid>', views.searchCenter, name="searchCenter"),
    path('getAllCenterMember/', views.getAllCenterMember, name="getAllCenterMember"),
    path('getMemberCenters/<str:username>', views.getMemberCenters, name="getMemberCenters"),
    path('registerCenter/', views.registerCenter, name="registerCenter"),
    path('registerCenterMember/', views.registerCenterMember, name="registerCenterMember"),
    path('plan/getPlans/', views.getPlans, name="getPlans"),
    path('plan/getCenterPlans/<str:centerid>', views.getCenterPlans, name="getCenterPlans"),
    path('plan/getMemberPlan/<str:centerid>/<str:username>', views.getMemberPlan, name="getMemberPlan"),
    path('plan/registerPlan/', views.registerPlan, name="registerCenterPlan"),
]