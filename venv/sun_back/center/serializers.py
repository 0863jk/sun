from .models import Center, Plan, Member
from rest_framework import serializers

class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class UserPlanSerializer(serializers.ModelSerializer):
    plan = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = '__all__'
    
    def get_plan(self, obj):
        plan_id = obj.planid
        try:
            plan = Plan.objects.get(planid=plan_id)
            return PlanSerializer(plan).data
        except Plan.DoesNotExist:
            return None