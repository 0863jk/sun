from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Lesson, TimetableBlock, Enrolment, LessonReview
from .serializers import (
    LessonSerializer,
    TimetableBlockSerializer,
    EnrolmentSerializer,
    LessonReviewSerializer
)
from accounts.models import User
from accounts.serializers import UserSerializer

class LessonViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = Lesson.objects.all()
        serializer = LessonSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = Lesson.objects.get(lessonid=pk)
        serializer = LessonSerializer(datas, many=False)
        return Response(serializer.data)
    
    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = LessonSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getCenterLessons(self, request, centerid):
        datas = Lesson.objects.filter(centerid=centerid)
        serializer = LessonSerializer(datas, many=True)

        return Response(serializer.data)

class TimetableBlockViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = TimetableBlock.objects.all()
        serializer = TimetableBlockSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = TimetableBlock.objects.get(blockid=pk)
        serializer = TimetableBlockSerializer(datas, many=False)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = TimetableBlockSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getCenterTimetable(self, request, centerid):
        datas = TimetableBlock.objects.filter(centerid=centerid)
        serializer = TimetableBlockSerializer(datas, many=True)

        return Response(serializer.data)

class EnrolmentViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = Enrolment.objects.all()
        serializer = EnrolmentSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = Enrolment.objects.get(id=pk)
        serializer = EnrolmentSerializer(datas, many=False)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = EnrolmentSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['PUT'])
    def update(self, request, blockid):
        try:
            data = TimetableBlock.objects.get(blockid=blockid)
        except TimetableBlock.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TimetableBlockSerializer(data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    @action(detail=False, methods=['GET'])
    def getApplicants(self, request):
        blockid = request.query_params.get('blockid', '')
        userinfo = Enrolment.objects.get(blockid=blockid)
        
        data = User.objects.filter(userid=userinfo.userid)

        serializer = UserSerializer(data, many=True)
        
        return Response(serializer.data)

class LessonReviewViewSet(viewsets.ViewSet):
    @staticmethod
    def list(request):
        datas = LessonReview.objects.all()
        serializer = LessonReviewSerializer(datas, many=True)
        return Response(serializer.data)

    @staticmethod
    def retrieve(request, pk=None):
        datas = LessonReview.objects.get(id=pk)
        serializer = LessonReviewSerializer(datas, many=False)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def register(self, request):
        reqData = request.data
        serializer = LessonReviewSerializer(data=reqData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    