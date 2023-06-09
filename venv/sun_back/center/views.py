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

class CenterViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = Center.objects.all()
        serializer = CenterSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = Center.objects.get(centerid=pk)
        serializer = CenterSerializer(datas, many=False)
        return Response(serializer.data)
    
    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = CenterSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def search(self, request):
        centerid = request.query_params.get('centerid', '')
        datas = Center.objects.filter(centerid__contains=centerid)
        serializer = CenterSerializer(datas, many=True)
        return Response(serializer.data)

class PlanViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = Plan.objects.all()
        serializer = PlanSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = Plan.objects.get(planid=pk)
        serializer = PlanSerializer(datas, many=False)
        return Response(serializer.data)
    
    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = PlanSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
        
        data = Plan.objects.filter(planid=registerinfo.planid)

        serializer = PlanSerializer(data, many=True)
        
        return Response(serializer.data)

class MemberViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = Member.objects.all()
        serializer = MemberSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = Member.objects.get(id=pk)
        serializer = MemberSerializer(datas, many=False)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = MemberSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=False, methods=['GET'])
    # def getMemberCenters(request, username):
    #     center_ids = Member.objects.filter(userid=username).values_list('centerid')
    #     datas = Center.objects.filter(centerid__in=center_ids)

    #     serializer = CenterSerializer(datas, many=True)
        
    #     return Response(serializer.data)

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
    

# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .models import Center, Plan, Member, Lesson, TimetableBlock, Enrolment
# from .serializers import (
#     CenterSerializer,
#     PlanSerializer,
#     MemberSerializer,
#     UserPlanSerializer,
#     LessonSerializer,
#     TimetableBlockSerializer,
#     EnrolmentSerializer,
# )
# from accounts.models import User
# from accounts.serializers import UserDataSerializer

# # Create your views here.

# # GET: 모든 센터 불러오기
# @api_view(['GET'])
# def getCenters(request):
#     datas = Center.objects.all()
#     serializer = CenterSerializer(datas, many=True)

#     return Response(serializer.data)

# # GET: centerid를 받아서 해당 센터 정보만 불러오기
# @api_view(['GET'])
# def getCenter(request, centerid):
#     datas = Center.objects.get(centerid=centerid)
#     serializer = CenterSerializer(datas, many=False)

#     return Response(serializer.data)

# # GET: centerid로 센터를 검색하기
# @api_view(['GET'])
# def searchCenter(request, centerid):
#     datas = Center.objects.filter(centerid__contains=centerid)
#     serializer = CenterSerializer(datas, many=True)

#     return Response(serializer.data)

# # GET: Member 테이블 불러오기
# @api_view(['GET'])
# def getAllMember(request):
#     datas = Member.objects.all()
#     serializer = MemberSerializer(datas, many=True)
    
#     return Response(serializer.data)

# # GET: username으로 user가 사용하는 센터 정보 불러오기
# @api_view(['GET'])
# def getMemberCenters(request, username):
#     center_ids = Member.objects.filter(userid=username).values_list('centerid')
#     datas = Center.objects.filter(centerid__in=center_ids)

#     serializer = CenterSerializer(datas, many=True)
    
#     return Response(serializer.data)

# # GET: 모든 플랜 불러오기
# @api_view(['GET'])
# def getPlans(request):
#     datas = Plan.objects.all()
#     serializer = PlanSerializer(datas, many=True)

#     return Response(serializer.data)

# # GET: planid를 받아 plan 정보 불러오기
# @api_view(['GET'])
# def getPlan(request, planid):
#     data = Plan.objects.filter(planid=planid)
#     serializer = PlanSerializer(data, many=False)

#     return Response(serializer.data)

# # GET: centerid를 받아 해당 센터의 plan만 불러오기
# @api_view(['GET'])
# def getCenterPlans(request, centerid):
#     datas = Plan.objects.filter(centerid=centerid)
#     serializer = PlanSerializer(datas, many=True)

#     return Response(serializer.data)

# # GET: username을 받아 해당 유저가 사용하는 플랜 정보 불러오기
# @api_view(['GET'])
# def getMemberPlan(request, centerid, username):
#     data = Member.objects.filter(centerid=centerid, userid=username).first()
#     serializer = UserPlanSerializer(data)
#     return Response(serializer.data)

# # GET: centerid 받아 센터 안의 모든 레슨 불러오기
# @api_view(['GET'])
# def getCenterLesson(request, centerid):
#     datas = Lesson.objects.filter(centerid=centerid)
#     serializer = LessonSerializer(datas, many=True)

#     return Response(serializer.data)

# # GET: centerid 받아 센터의 시간표 불러오기
# @api_view(['GET'])
# def getCenterTimetable(request, centerid):
#     datas = TimetableBlock.objects.filter(centerid=centerid)
#     serializer = TimetableBlockSerializer(datas, many=True)

#     return Response(serializer.data)

# # GET: centerid를 받아 센터 내에 등록된 트레이너 정보 불러오기
# @api_view(['GET'])
# def getCenterTrainers(request, centerid):
#     trainer_ids = Member.objects.filter(centerid=centerid, role="trainer").values_list('userid')
#     datas = User.objects.filter(username__in=trainer_ids)

#     serializer = UserDataSerializer(datas, many=True)
    
#     return Response(serializer.data)

# # GET: centerid를 받아 센터 내에 등록된 트레이너 정보 불러오기
# @api_view(['GET'])
# def getMembers(request, centerid):
#     user_ids = Member.objects.filter(centerid=centerid, role="general").values_list('userid')
#     datas = User.objects.filter(username__in=user_ids)

#     serializer = UserDataSerializer(datas, many=True)
    
#     return Response(serializer.data)

# # GET: id를 받아 Lesson 정보 불러오기
# @api_view(['GET'])
# def getLesson(request, lessonid):
#     data = Lesson.objects.get(lessonid=lessonid)
#     serializer = LessonSerializer(data, many=False)

#     return Response(serializer.data)

# # GET: id를 받아 timetableblock 정보 불러오기
# @api_view(['GET'])
# def getTimetableBlock(request, blockid):
#     data = TimetableBlock.objects.get(blockid=blockid)
#     serializer = TimetableBlockSerializer(data, many=False)

#     return Response(serializer.data)

# # POST: 센터 등록
# @api_view(['POST'])
# def registerCenter(request):
#     reqData = request.data
#     serializer = CenterSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # POST: 플랜 등록
# @api_view(['POST'])
# def registerPlan(request):
#     reqData = request.data
#     serializer = PlanSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # POST: Center 내에 Member 등록
# @api_view(['POST'])
# def registerMember(request):
#     reqData = request.data
#     serializer = MemberSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # POST: Center 내에 Lesson 등록
# @api_view(['POST'])
# def registerLesson(request):
#     reqData = request.data
#     serializer = LessonSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # POST: Center 내에 TimetableBlock 등록
# @api_view(['POST'])
# def registerTimetableBlock(request):
#     reqData = request.data
#     serializer = TimetableBlockSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getEnrolments(request):
#     datas = Enrolment.objects.all()
#     serializer = EnrolmentSerializer(datas, many=True)

#     return Response(serializer.data)

# @api_view(['GET'])
# def getEnrolment(request, blockid):
#     user_ids = Enrolment.objects.filter(blockid=blockid).values_list('userid')
#     datas = User.objects.filter(username__in=user_ids)

#     serializer = UserDataSerializer(datas, many=True)
    
#     return Response(serializer.data)

# @api_view(['POST'])
# def registerEnrolment(request):
#     reqData = request.data
#     serializer = EnrolmentSerializer(data=reqData)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# def updateTimetableBlock(request, blockid):
#     try:
#         data = TimetableBlock.objects.get(blockid=blockid)
#     except TimetableBlock.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     serializer = TimetableBlockSerializer(data, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getMemberLessonHistory(request, userid, centerid):
#     blockids = Enrolment.objects.filter(userid=userid, centerid=centerid).values_list('blockid')
#     datas = TimetableBlock.objects.filter(blockid__in=blockids)

#     serializer = TimetableBlockSerializer(datas, many=True)
    
#     return Response(serializer.data)

# def 