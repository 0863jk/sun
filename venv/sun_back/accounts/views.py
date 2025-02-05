from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

# Create your views here.
@api_view(['GET'])
def getUserDatas(request):
    datas = User.objects.all()
    serializer = UserSerializer(datas, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def postUser(request):
    reqData = request.data
    serializer = UserSerializer(data=reqData)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getUsername(request, username):
    data = User.objects.get(username=username)
    serializer = UserSerializer(data, many=False)
        
    return Response(serializer.data)

# @api_view(['POST'])
# def getUsername(request):
#     reqData = request.data
#     username = reqData['username']
#     data = User.objects.filter(username=username)
#     serializer = UserSerializer(data, many=True)
        
#     return Response(serializer.data)

# @api_view(['GET'])
# def searchTrainerUser(request, username):
#     datas = User.objects.filter(username__contains=username, role='instroctor')
#     serializer = UserSerializer(datas, many=True)

#     return Response(serializer.data)

class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['GET'])
    def searchUserByUsername(self, request):
        username=request.query_params.get('username', '')
        name=request.query_params.get('name', '')
        role=request.query_params.get('role', '')
        email=request.query_params.get('email', '')
        datas = User.objects.filter(role=role)
        datas = datas.filter(username__contains=username, email__contains=email, name__contains=name)
        # datas = datas.filter(username__contains=username)
        serializer = UserSerializer(datas, many=True)
        
        return Response(serializer.data)