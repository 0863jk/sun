from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Center, Plan, CenterMember, Lesson, Timetable
from accounts.models import User
from .serializers import CenterDataSerializer, PlanDataSerializer, CenterMemberSerializer, UserPlanSerializer, LessonSerializer, TimetableSerializer
from accounts.serializers import UserDataSerializer
from django.shortcuts import render


# Create your views here.

# GET: 모든 센터 불러오기
@api_view(['GET'])
def getCenters(request):
    datas = Center.objects.all()
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)

# GET: centerid를 받아서 해당 센터 정보만 불러오기
@api_view(['GET'])
def getCenter(request, centerid):
    datas = Center.objects.filter(centerid=centerid)
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)

# GET: centerid로 센터를 검색하기
@api_view(['GET'])
def searchCenter(request, centerid):
    datas = Center.objects.filter(centerid__contains=centerid)
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)

# GET: CenterMember 테이블 불러오기
@api_view(['GET'])
def getAllCenterMember(request):
    datas = CenterMember.objects.all()
    serializer = CenterMemberSerializer(datas, many=True)
    
    return Response(serializer.data)

# GET: username으로 user가 사용하는 센터 정보 불러오기
@api_view(['GET'])
def getMemberCenters(request, username):
    center_ids = CenterMember.objects.filter(userid=username).values_list('centerid')
    datas = Center.objects.filter(centerid__in=center_ids)

    serializer = CenterDataSerializer(datas, many=True)
    
    return Response(serializer.data)

# GET: 모든 플랜 불러오기
@api_view(['GET'])
def getPlans(request):
    datas = Plan.objects.all()
    serializer = PlanDataSerializer(datas, many=True)

    return Response(serializer.data)

# GET: planid를 받아 plan 정보 불러오기
@api_view(['GET'])
def getPlan(request, planid):
    data = Plan.objects.filter(planid=planid)
    serializer = PlanDataSerializer(data, many=False)

    return Response(serializer.data)

# GET: centerid를 받아 해당 센터의 plan만 불러오기
@api_view(['GET'])
def getCenterPlans(request, centerid):
    datas = Plan.objects.filter(centerid=centerid)
    serializer = PlanDataSerializer(datas, many=True)

    return Response(serializer.data)

# GET: username을 받아 해당 유저가 사용하는 플랜 정보 불러오기
@api_view(['GET'])
def getMemberPlan(request, centerid, username):
    data = CenterMember.objects.filter(centerid=centerid, userid=username).first()
    serializer = UserPlanSerializer(data)
    return Response(serializer.data)

# GET: centerid 받아 센터 안의 레슨 불러오기
@api_view(['GET'])
def getCenterLesson(request, centerid):
    datas = Lesson.objects.filter(centerid=centerid)
    serializer = LessonSerializer(datas, many=True)

    return Response(serializer.data)

# GET: centerid 받아 센터의 시간표 불러오기
@api_view(['GET'])
def getTimetable(request, centerid):
    datas = Timetable.objects.filter(centerid=centerid)
    serializer = TimetableSerializer(datas, many=True)

    return Response(serializer.data)

# GET: centerid를 받아 센터 내에 등록된 트레이너 정보 불러오기
@api_view(['GET'])
def getCenterTrainers(request, centerid):
    trainer_ids = CenterMember.objects.filter(centerid=centerid, role="trainer").values_list('userid')
    datas = User.objects.filter(username__in=trainer_ids)

    serializer = UserDataSerializer(datas, many=True)
    
    return Response(serializer.data)

# GET: centerid를 받아 센터 내에 등록된 트레이너 정보 불러오기
@api_view(['GET'])
def getCenterMembers(request, centerid):
    user_ids = CenterMember.objects.filter(centerid=centerid, role="general").values_list('userid')
    datas = User.objects.filter(username__in=user_ids)

    serializer = UserDataSerializer(datas, many=True)
    
    return Response(serializer.data)


# POST: 센터 등록
@api_view(['POST'])
def registerCenter(request):
    reqData = request.data
    serializer = CenterDataSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# POST: 플랜 등록
@api_view(['POST'])
def registerPlan(request):
    reqData = request.data
    serializer = PlanDataSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# POST: Center 내에 Member 등록
@api_view(['POST'])
def registerCenterMember(request):
    reqData = request.data
    serializer = CenterMemberSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST: Center 내에 Lesson 등록
@api_view(['POST'])
def registerLesson(request):
    reqData = request.data
    serializer = LessonSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# POST: Center 내에 Timetable 등록
@api_view(['POST'])
def registerTimetable(request):
    reqData = request.data
    serializer = TimetableSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)