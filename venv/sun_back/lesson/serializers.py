from .models import Lesson, TimetableBlock, Enrolment, LessonReview
from rest_framework import serializers

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class TimetableBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimetableBlock
        fields = '__all__'

class EnrolmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrolment
        fields = '__all__'

class LessonReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonReview
        fields = '__all__'