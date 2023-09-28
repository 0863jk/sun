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

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    # @staticmethod
    # def list(request):
    #     datas = Lesson.objects.all()
    #     serializer = LessonSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def retrieve(request, pk=None):
    #     datas = Lesson.objects.get(lessonid=pk)
    #     serializer = LessonSerializer(datas, many=False)
    #     return Response(serializer.data)
    
    # @action(detail=False, methods=['POST'])
    # def register(self, request):
    #     reqData = request.data
    #     serializer = LessonSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getCenterLessons(self, request, centerid):
        datas = Lesson.objects.filter(centerid=centerid)
        serializer = LessonSerializer(datas, many=True)

        return Response(serializer.data)

class TimetableBlockViewSet(viewsets.ViewSet):
    queryset = TimetableBlock.objects.all()
    serializer_class = TimetableBlockSerializer

    # @staticmethod
    # def list(request):
    #     datas = TimetableBlock.objects.all()
    #     serializer = TimetableBlockSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def retrieve(request, pk=None):
    #     datas = TimetableBlock.objects.get(blockid=pk)
    #     serializer = TimetableBlockSerializer(datas, many=False)
    #     return Response(serializer.data)

    # @action(detail=False, methods=['POST'])
    # def register(self, request):
    #     reqData = request.data
    #     serializer = TimetableBlockSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getCenterTimetable(self, request, centerid):
        datas = TimetableBlock.objects.filter(centerid=centerid)
        serializer = TimetableBlockSerializer(datas, many=True)

        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getMemberTimetable(self, request, userid):
        blockids = Enrolment.objects.filter(userid=userid).values_list('blockid')
        datas = TimetableBlock.objects.filter(blockid__in=blockids)

        serializer = TimetableBlockSerializer(datas, many=True)

        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getTrainerTimetable(self, request, userid):
        datas = TimetableBlock.objects.filter(trainerid=userid)
        serializer = TimetableBlockSerializer(datas, many=True)

        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def getMemberHistory(self, request):
        userid = request.query_params.get('userid', '')
        centerid = request.query_params.get('centerid', '')

        blockids = Enrolment.objects.filter(centerid=centerid, userid=userid).values_list('blockid')
        datas = TimetableBlock.objects.filter(blockid__in=blockids)

        serializer = TimetableBlockSerializer(datas, many=True)

        return Response(serializer.data)
    
    # @action(detail=False, methods=['PUT'])
    # def update(self, request, blockid):
    #     try:
    #         data = TimetableBlock.objects.get(blockid=blockid)
    #     except TimetableBlock.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    #     serializer = TimetableBlockSerializer(data, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getTrainerHistory(self, request):
        userid = request.query_params.get('userid', '')
        centerid = request.query_params.get('centerid', '')
        datas = TimetableBlock.objects.filter(trainerid=userid, centerid=centerid)
        serializer = TimetableBlockSerializer(datas, many=True)    
        return Response(serializer.data)

class EnrolmentViewSet(viewsets.ViewSet):
    queryset = Enrolment.objects.all()
    serializer_class = EnrolmentSerializer

    # @staticmethod
    # def list(request):
    #     datas = Enrolment.objects.all()
    #     serializer = EnrolmentSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def retrieve(request, pk=None):
    #     datas = Enrolment.objects.get(id=pk)
    #     serializer = EnrolmentSerializer(datas, many=False)
    #     return Response(serializer.data)

    # @action(detail=False, methods=['POST'])
    # def register(self, request):
    #     reqData = request.data
    #     serializer = EnrolmentSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getApplicants(self, request):
        blockid = request.query_params.get('blockid', '')
        userids = Enrolment.objects.filter(blockid=blockid).values_list('userid')
        data = User.objects.filter(username__in=userids)
        serializer = UserSerializer(data, many=True)
        
        return Response(serializer.data)

class LessonReviewViewSet(viewsets.ViewSet):
    queryset = LessonReview.objects.all()
    serializer_class = LessonReviewSerializer

    # @staticmethod
    # def list(request):
    #     datas = LessonReview.objects.all()
    #     serializer = LessonReviewSerializer(datas, many=True)
    #     return Response(serializer.data)

    # @staticmethod
    # def retrieve(request, pk=None):
    #     datas = LessonReview.objects.get(id=pk)
    #     serializer = LessonReviewSerializer(datas, many=False)
    #     return Response(serializer.data)

    # @action(detail=False, methods=['POST'])
    # def register(self, request):
    #     reqData = request.data
    #     serializer = LessonReviewSerializer(data=reqData)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['GET'])
    def getBlockReview(self, request):
        blockid = request.query_params.get('blockid', '')
        datas = LessonReview.objects.filter(blockid=blockid)
        serializer = LessonReviewSerializer(datas, many=True)
        
        return Response(serializer.data)
    