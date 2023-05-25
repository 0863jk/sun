from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Center, Plan, CenterMember
from .serializers import CenterDataSerializer, PlanDataSerializer, CenterMemberSerializer, UserPlanSerializer
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

# GET: username을 받아 CenterMember 테이블에서 username이 들어가 있는 centerid list를 받아온 후 centerid에 해당하는 center 정보 불러오기
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

# GET: centerid를 받아 해당 센터의 plan만 불러오기
@api_view(['GET'])
def getCenterPlans(request, centerid):
    datas = Plan.objects.filter(centerid=centerid)
    serializer = PlanDataSerializer(datas, many=True)

    return Response(serializer.data)

# GET: username을 받아 해당 유저가 사용하는 플랜 정보 불러오기
# @api_view(['GET'])
# def getMemberPlan(request, centerid, username):
#     datas = CenterMember.objects.filter(centerid=centerid, userid=username).select_related('planid')

#     serializer = UserPlanSerializer(datas, many=True)
    
#     return Response(serializer.data)

@api_view(['GET'])
def getMemberPlan(request, centerid, username):
    data = CenterMember.objects.filter(centerid=centerid, userid=username).first()
    serializer = UserPlanSerializer(data)
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