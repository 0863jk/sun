from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Center, Plan, Member
from .serializers import (
    CenterSerializer,
    PlanSerializer,
    MemberSerializer,
)
from accounts.models import User
from accounts.serializers import UserSerializer

class CenterViewSet(viewsets.ModelViewSet):
    queryset = Center.objects.all()
    serializer_class = CenterSerializer
    # @staticmethod
    # def get(request):
    #     datas = Center.objects.all()
    #     serializer = CenterSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def get_object(request, pk=None):
    #     datas = Center.objects.get(centerid=pk)
    #     serializer = CenterSerializer(datas, many=False)
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['POST'])
    # def put(self, request):
    #     reqData = request.data
    #     serializer = CenterSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=False, methods=['PUT'])
    # def update(self, request, pk):
    #     try:
    #         data = Center.objects.get(centerid=pk)
    #     except Center.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #     serializer = CenterSerializer(data, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=False, methods=['GET'])
    # def delete(self, pk=None):
    #     center = self.get_object(centerid=pk)
    #     center.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # @action(detail=False, methods=['GET'])
    # def search(self, request):
    #     centerid = request.query_params.get('centerid', '')
    #     datas = Center.objects.filter(centerid__contains=centerid)
    #     serializer = CenterSerializer(datas, many=True)
    #     return Response(serializer.data)

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    # @staticmethod
    # def list(request):
    #     datas = Plan.objects.all()
    #     serializer = PlanSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def retrieve(request, pk=None):
    #     datas = Plan.objects.get(planid=pk)
    #     serializer = PlanSerializer(datas, many=False)
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['POST'])
    # def register(self, request):
    #     reqData = request.data
    #     serializer = PlanSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getCenterPlans(self, request, centerid):
        datas = Plan.objects.filter(centerid=centerid)
        serializer = PlanSerializer(datas, many=True)

        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMemberPlan(self, request):
        centerid = request.query_params.get('centerid', '')
        userid = request.query_params.get('userid', '')
        registerinfo = Member.objects.get(centerid=centerid, userid=userid)
        
        data = Plan.objects.get(planid=registerinfo.planid)

        serializer = PlanSerializer(data, many=False)
        
        return Response(serializer.data)

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    # @staticmethod
    # def list(request):
    #     datas = Member.objects.all()
    #     serializer = MemberSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def retrieve(request, pk=None):
    #     datas = Member.objects.get(id=pk)
    #     serializer = MemberSerializer(datas, many=False)
    #     return Response(serializer.data)

    # @action(detail=False, methods=['POST'])
    # def register(self, request):
    #     reqData = request.data
    #     serializer = MemberSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def getMemberCenters(self, request):
        userid = request.query_params.get('userid', '')
        center_ids = Member.objects.filter(userid=userid).values_list('centerid')
        datas = Center.objects.filter(centerid__in=center_ids)

        serializer = CenterSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMembers(self, request):
        centerid = request.query_params.get('centerid', '')
        user_ids = Member.objects.filter(centerid=centerid).values_list('userid')
        datas = User.objects.filter(username__in=user_ids)

        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMembersByRole(self, request):
        centerid = request.query_params.get('centerid', '')
        role = request.query_params.get('role', '')
        user_ids = Member.objects.filter(centerid=centerid, role=role).values_list('userid')
        datas = User.objects.filter(username__in=user_ids)

        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getRegisterInfo(self, request):
        centerid = request.query_params.get('centerid', '')
        userid = request.query_params.get('userid', '')
        datas = Member.objects.get(centerid=centerid, userid=userid)

        serializer = MemberSerializer(datas, many=False)
        
        return Response(serializer.data)
    