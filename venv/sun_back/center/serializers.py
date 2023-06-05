from .models import Center, Plan, CenterMember, Lesson, TimetableBlock
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

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class TimetableBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimetableBlock
        fields = '__all__'

class UserPlanSerializer(serializers.ModelSerializer):
    plan = serializers.SerializerMethodField()

    class Meta:
        model = CenterMember
        fields = '__all__'
    
    def get_plan(self, obj):
        plan_id = obj.planid
        try:
            plan = Plan.objects.get(planid=plan_id)
            return PlanDataSerializer(plan).data
        except Plan.DoesNotExist:
            return None