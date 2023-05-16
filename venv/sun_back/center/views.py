from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Center, Plan, CenterMember
from .serializers import CenterDataSerializer, PlanDataSerializer, CenterMemberSerializer
from django.shortcuts import render

# Create your views here.

@api_view(['GET'])
def getCenters(request):
    datas = Center.objects.all()
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getCenter(request, centerid):
    datas = Center.objects.filter(centerid=centerid)
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)
@api_view(['GET'])
def searchCenter(request, centerid):
    datas = Center.objects.filter(centerid__contains=centerid)
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getAllCenterMember(request):
    datas = CenterMember.objects.all()
    serializer = CenterMemberSerializer(datas, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getMemberCenters(request, userid):
    center_ids = CenterMember.objects.filter(userid=userid).values_list('centerid')
    datas = Center.objects.filter(centerid__in=center_ids)

    serializer = CenterDataSerializer(datas, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getPlans(request):
    datas = Plan.objects.all()
    serializer = PlanDataSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getCenterPlans(request, centerid):
    datas = Plan.objects.filter(centerid=centerid)
    serializer = PlanDataSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def registerCenter(request):
    reqData = request.data
    serializer = CenterDataSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registerPlan(request):
    reqData = request.data
    serializer = PlanDataSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def registerCenterMember(request):
    reqData = request.data
    serializer = CenterMemberSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)