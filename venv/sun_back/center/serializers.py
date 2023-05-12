from .models import Center, Plan, CenterMember
from rest_framework import serializers

class CenterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = '__all__'

class PlanDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class CenterMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterMember
        fields = '__all__'
