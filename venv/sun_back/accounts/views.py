from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserDataSerializer
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

# Create your views here.
@api_view(['GET'])
def getUserDatas(request):
    datas = User.objects.all()
    serializer = UserDataSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def postUser(request):
    reqData = request.data
    serializer = UserDataSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def getUsername(request):
    reqData = request.data
    username = reqData['username']
    data = User.objects.filter(username=username)
    serializer = UserDataSerializer(data, many=True)
        
    return Response(serializer.data)

@api_view(['GET'])
def searchTrainerUser(request, username):
    datas = User.objects.filter(username__contains=username, role='trainer')
    serializer = UserDataSerializer(datas, many=True)

    return Response(serializer.data)