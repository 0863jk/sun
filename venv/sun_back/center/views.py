from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    Center,
    Pass,
    # Plan,
    Member,
    Payments
)
from .serializers import (
    CenterSerializer,
    PassSerializer,
    # PlanSerializer,
    MemberSerializer,
    PaymentsSerializer
)
from accounts.models import User
from accounts.serializers import UserSerializer

class CenterViewSet(viewsets.ModelViewSet):
    queryset = Center.objects.all()
    serializer_class = CenterSerializer

# class PlanViewSet(viewsets.ModelViewSet):
#     queryset = Plan.objects.all()
#     serializer_class = PlanSerializer
#     # @staticmethod
#     # def list(request):
#     #     datas = Plan.objects.all()
#     #     serializer = PlanSerializer(datas, many=True)
#     #     return Response(serializer.data)

#     # @staticmethod
#     # def retrieve(request, pk=None):
#     #     datas = Plan.objects.get(planid=pk)
#     #     serializer = PlanSerializer(datas, many=False)
#     #     return Response(serializer.data)
    
#     # @action(detail=False, methods=['POST'])
#     # def register(self, request):
#     #     reqData = request.data
#     #     serializer = PlanSerializer(data=reqData)
#     #     if serializer.is_valid():
#     #         serializer.save()
#     #         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     @action(detail=False, methods=['GET'])
#     def getCenterPlans(self, request, centerid):
#         datas = Plan.objects.filter(centerid=centerid)
#         serializer = PlanSerializer(datas, many=True)

#         return Response(serializer.data)
    
#     @action(detail=False, methods=['GET'])
#     def getMemberPlan(self, request):
#         centerid = request.query_params.get('centerid', '')
#         userid = request.query_params.get('userid', '')
#         registerinfo = Member.objects.get(centerid=centerid, userid=userid)
        
#         data = Plan.objects.get(planid=registerinfo.planid)

#         serializer = PlanSerializer(data, many=False)
        
#         return Response(serializer.data)

class PassViewSet(viewsets.ModelViewSet):
    queryset = Pass.objects.all()
    serializer_class = PassSerializer

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
        
        data = Pass.objects.get(pass_id=register_info.pass_id)

        serializer = PassSerializer(data, many=False)
        
        return Response(serializer.data)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    @action(detail=False, methods=['GET'])
    def getMemberCenters(self, request):
        user_id = request.query_params.get('user_id', '')
        center_ids = Member.objects.filter(user_id=user_id).values_list('center_id')
        datas = Center.objects.filter(center_id__in=center_ids)

        serializer = CenterSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMembers(self, request):
        center_id = request.query_params.get('center_id', '')
        user_ids = Member.objects.filter(center_id=center_id).values_list('user_id')
        datas = User.objects.filter(username__in=user_ids)

        serializer = UserSerializer(datas, many=True)
        
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

        serializer = MemberSerializer(datas, many=False)
        
        return Response(serializer.data)

class PaymentsViewSet(viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentsSerializer