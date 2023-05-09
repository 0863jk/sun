from django.urls import path
from . import views

urlpatterns = [
    path('getCenters/', views.getCenters, name="getCenters"),
    path('registerCenter/', views.registerCenter, name="registerCenter"),
    path('plan/getPlans/', views.getCenterPlans, name="getCenterPlans"),
    path('plan/registerPlan/', views.registerCenterPlan, name="registerCenterPlan"),
]