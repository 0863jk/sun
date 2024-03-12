from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    Center,
    Pass,
    Member,
    Instroctor,
    Payments
)
from .serializers import (
    CenterSerializer,
    PassSerializer,
    PassStatusSerializer,
    MemberSerializer,
    UserPassSerializer,
    InstroctorSerializer,
    PaymentsSerializer,
    CenterStatusSerializer
)
from accounts.models import User
from accounts.serializers import UserSerializer
from django.utils import timezone

class CenterViewSet(viewsets.ModelViewSet):
    queryset = Center.objects.all()
    serializer_class = CenterSerializer

    @action(detail=False, methods=['GET'])
    def getCenterStatus(self, request):
        center_id = request.query_params.get('center_id', '')
        datas = Center.objects.get(center_id=center_id)
        serializer = CenterStatusSerializer(datas, many=False)

        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getUserCenterList(self, request):
        user_id = request.query_params.get('user_id', '')
        role = request.query_params.get('role', '')

        if role == "general":
            center_ids = Member.objects.filter(user_id=user_id).values_list('center_id')
            datas = Center.objects.filter(center_id__in=center_ids)
        
        elif role == "instroctor":
            center_ids = Instroctor.objects.filter(user_id=user_id).values_list('center_id')
            datas = Center.objects.filter(center_id__in=center_ids)
            
        elif role == "manager":
            user_id = request.query_params.get('user_id', '')
            datas = Center.objects.filter(manager_id=user_id)

        serializer = CenterSerializer(datas, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def searchCenter(self, request):
        center_id = request.query_params.get('center_id', '')
        center_name = request.query_params.get('center_name', '')
        manager_id = request.query_params.get('manager_id', '')
        
        filters = {}
        if center_id:
            filters['center_id__icontains'] = center_id
        if center_name:
            filters['center_name__icontains'] = center_name
        if manager_id:
            filters['manager_id'] = manager_id

        datas = Center.objects.all()
        for key, value in filters.items():
            datas = datas.filter(**{key: value})

        serializer = CenterSerializer(datas, many=True)
        return Response(serializer.data)

class PassViewSet(viewsets.ModelViewSet):
    queryset = Pass.objects.all()
    serializer_class = PassStatusSerializer

    @action(detail=False, methods=['GET'])
    def getCenterPasses(self, request, center_id):
        datas = Pass.objects.filter(center_id=center_id)
        serializer = PassSerializer(datas, many=True)

        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMemberPass(self, request):
        center_id = request.query_params.get('center_id', '')
        user_id = request.query_params.get('user_id', '')
        register_info = Member.objects.get(center_id=center_id, user_id=user_id)
        
        if(register_info.pass_id):
            data = Pass.objects.get(pass_id=register_info.pass_id)
            serializer = PassSerializer(data, many=False)
        
            return Response(serializer.data)
        else:
            return Response({"error": "등록된 정보가 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @action(detail=False, methods=['POST'])
    def insertMember(self, request):
        user_id = request.data.get('user_id', '')
        center_id = request.data.get('center_id', '')
        member = Member.objects.filter(user_id=user_id, center_id=center_id)
        if member.count() > 0:
            return Response({"error": "이미 등록된 멤버입니다."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = MemberSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=False, methods=['POST'])
    def insertMemberWithPayments(self, request):
        user_id = request.data.get('user_id', '')
        center_id = request.data.get('center_id', '')
        pass_id = request.data.get('pass_id', '')

        member = Member.objects.filter(user_id=user_id, center_id=center_id)
        
        if member.count() > 0:
            return Response({"error": "이미 등록된 멤버입니다."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = MemberSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                if pass_id:
                    # 새로운 데이터를 Payments 테이블에 등록하는 부분
                    pass_info = Pass.objects.get(pass_id=pass_id)
                    payment_data = {
                        'user_id': user_id,
                        'center_id': center_id,
                        'pass_id': pass_id,
                        'amount': pass_info.price,
                        'payment_date': request.data.get('register_date', ''),
                        'category': 'register',
                        'payment_method': 'auto_created',
                        'payment_status': 'completed',
                    }

                    payment_serializer = PaymentsSerializer(data=payment_data)
                    if payment_serializer.is_valid():
                        payment_serializer.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def getMemberCenters(self, request):
        user_id = request.query_params.get('user_id', '')
        center_ids = Member.objects.filter(user_id=user_id).values_list('center_id')
        datas = Center.objects.filter(center_id__in=center_ids)

        serializer = CenterSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getCenterMembers(self, request):
        center_id = request.query_params.get('center_id', '')
        user_ids = Member.objects.filter(center_id=center_id).values_list('user_id')
        datas = User.objects.filter(username__in=user_ids)

        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMembers(self, request):
        center_id = request.query_params.get('center_id', '')
        datas = Member.objects.filter(center_id=center_id)

        serializer = MemberSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMembersByRole(self, request):
        center_id = request.query_params.get('center_id', '')
        role = request.query_params.get('role', '')
        user_ids = Member.objects.filter(center_id=center_id, role=role).values_list('user_id')
        datas = User.objects.filter(username__in=user_ids)

        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getRegisterInfo(self, request):
        center_id = request.query_params.get('center_id', '')
        user_id = request.query_params.get('user_id', '')
        datas = Member.objects.get(center_id=center_id, user_id=user_id)

        serializer = UserPassSerializer(datas, many=False)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def searchUserInCenter(self, request):
        center_id=request.query_params.get('center_id', '')
        username=request.query_params.get('username', '')
        name=request.query_params.get('name', '')
        email=request.query_params.get('email', '')
        user_ids = Member.objects.filter(center_id=center_id).values_list('user_id')
        datas = User.objects.filter(username__in=user_ids)
        datas = datas.filter(username__contains=username, email__contains=email, name__contains=name)
        # datas = datas.filter(username__contains=username)
        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)
    
class InstroctorViewSet(viewsets.ModelViewSet):
    queryset = Instroctor.objects.all()
    serializer_class = InstroctorSerializer

    @action(detail=False, methods=['GET'])
    def getCenterInstroctor(self, request):
        center_id = request.query_params.get('center_id', '')
        user_ids = Instroctor.objects.filter(center_id=center_id).values_list('user_id')
        datas = User.objects.filter(username__in=user_ids)

        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getInstroctorPermissions(self, request):
        center_id = request.query_params.get('center_id', '')
        user_id = request.query_params.get('user_id', '')
        datas = Instroctor.objects.get(center_id=center_id, user_id=user_id)

        serializer = InstroctorSerializer(datas, many=False)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def searchInstroctorInCenter(self, request):
        center_id=request.query_params.get('center_id', '')
        username=request.query_params.get('username', '')
        name=request.query_params.get('name', '')
        email=request.query_params.get('email', '')
        user_ids = Instroctor.objects.filter(center_id=center_id).values_list('user_id')
        datas = User.objects.filter(username__in=user_ids)
        datas = datas.filter(username__contains=username, email__contains=email, name__contains=name)
        # datas = datas.filter(username__contains=username)
        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentsSerializer

    @action(detail=False, methods=['GET'])
    def getCenterPayments(self, request):
        center_id = request.query_params.get('center_id', '')
        datas = Payments.objects.filter(center_id=center_id)
        serializer = PaymentsSerializer(datas, many=True)

        return Response(serializer.data)
    
from django.http import JsonResponse
from .utils import estimate_monthly_revenue, calculate_total_revenue

def monthly_revenue_estimate_view(request, center_id):
    # 월별 예상 수익
    monthly_revenue_estimate = estimate_monthly_revenue(center_id)
    return JsonResponse({'monthly_revenue_estimate': monthly_revenue_estimate})

def total_revenue_view(request, center_id):
    # 총 수익
    total_revenue = calculate_total_revenue(center_id)
    return JsonResponse({'total_revenue': total_revenue})