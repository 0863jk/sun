from .models import Center, CenterPlan
from rest_framework import serializers

class CenterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = '__all__'

class CenterPlanDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterPlan
        fields = '__all__'
