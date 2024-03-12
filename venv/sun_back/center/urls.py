from django.urls import path
from center import views
from .views import monthly_revenue_estimate_view, total_revenue_view

app_name = 'center'

center_list = views.CenterViewSet.as_view({'get': 'list', 'post': 'create'})
center_detail = views.CenterViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})
pass_list = views.PassViewSet.as_view({'get': 'list', 'post': 'create'})
pass_detail = views.PassViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})
member_list = views.MemberViewSet.as_view({'get': 'list', 'post': 'create'})
member_detail = views.MemberViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})
instroctor_list = views.InstroctorViewSet.as_view({'get': 'list', 'post': 'create'})
instroctor_detail = views.InstroctorViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})
payments_list = views.PaymentsViewSet.as_view({'get': 'list', 'post': 'create'})
payments_detail = views.PaymentsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})

urlpatterns = [
    path('info', center_list),
    path('info/<str:pk>', center_detail),
    path('get', views.CenterViewSet.as_view({'get': 'getCenterStatus'})),
    path('list', views.CenterViewSet.as_view({'get': 'getUserCenterList'})),
    path('search', views.CenterViewSet.as_view({'get': 'searchCenter'})),

    path('pass/info', pass_list),
    path('pass/info/<str:pk>', pass_detail),
    path('pass/get/<str:center_id>', views.PassViewSet.as_view({'get': 'getCenterPasses'}), name="getCenterPasses"),
    path('pass/member', views.PassViewSet.as_view({'get': 'getMemberPass'}), name="getMemberPass"),

    path('member/info', member_list),
    path('member/info/<str:pk>', member_detail),
    path('member/list', views.MemberViewSet.as_view({'get': 'getCenterMembers'}), name="getMembers"),
    path('member/registerinfo', views.MemberViewSet.as_view({'get': 'getRegisterInfo'}), name="getRegisterInfo"),
    path('member/insert', views.MemberViewSet.as_view({'post': 'insertMemberWithPayments'})),
    path('member/search', views.MemberViewSet.as_view({'get': 'searchUserInCenter'})),
    
    path('instroctor/info', instroctor_list),
    path('instroctor/info/<str:pk>', instroctor_detail),
    path('instroctor/list', views.InstroctorViewSet.as_view({'get': 'getCenterInstroctor'}), name="getCenterInstroctor"),
    path('instroctor/permissions', views.InstroctorViewSet.as_view({'get': 'getInstroctorPermissions'})),
    path('instroctor/search', views.InstroctorViewSet.as_view({'get': 'searchInstroctorInCenter'})),
    
    path('payments/info', payments_list),
    path('payments/info/<str:pk>', payments_detail),
    path('payments/list', views.PaymentsViewSet.as_view({'get': 'getCenterPayments'})),
    
    path('center/<str:center_id>/monthly-revenue-estimate/', monthly_revenue_estimate_view, name='monthly_revenue_estimate'),
    path('center/<str:center_id>/total-revenue/', total_revenue_view, name='total_revenue'),
]
