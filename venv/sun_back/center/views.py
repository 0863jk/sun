from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Center, CenterPlan
from .serializers import CenterDataSerializer, CenterPlanDataSerializer
from django.shortcuts import render

# Create your views here.

@api_view(['GET'])
def getCenters(request):
    datas = Center.objects.all()
    serializer = CenterDataSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getCenterPlans(request):
    datas = CenterPlan.objects.all()
    serializer = CenterPlanDataSerializer(datas, many=True)

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
def registerCenterPlan(request):
    reqData = request.data
    serializer = CenterPlanDataSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)