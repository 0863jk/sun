from .models import (
    Center,
    # Plan,
    Pass,
    Member,
    Payments
)
from rest_framework import serializers

class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = '__all__'

class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = '__all__'

# class PlanSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Plan
#         fields = '__all__'

class PassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pass
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class PaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = '__all__'

class UserPassSerializer(serializers.ModelSerializer):
    center_pass = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = '__all__'
    
    # def get_plan(self, obj):
    #     plan_id = obj.planid
    #     try:
    #         plan = Plan.objects.get(planid=plan_id)
    #         return PlanSerializer(plan).data
    #     except Plan.DoesNotExist:
    #         return None
        
    def get_pass(self, obj):
        pass_id = obj.pass_id
        try:
            center_pass = Pass.objects.get(pass_id=pass_id)
            return PassSerializer(center_pass).data
        except Pass.DoesNotExist:
            return None