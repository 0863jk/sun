from .models import (
    Center,
    Pass,
    Member,
    Instroctor,
    Payments
)
from accounts.models import User
from rest_framework import serializers
from django.db.models import Sum, F
from django.utils import timezone
from datetime import datetime, timedelta

class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = '__all__'

class CenterStatusSerializer(serializers.ModelSerializer):
    number_of_members = serializers.SerializerMethodField()
    monthly_revenue_estimate = serializers.SerializerMethodField()
    total_revenue = serializers.SerializerMethodField()

    class Meta:
        model = Center
        fields = '__all__'
    
    def get_number_of_members(self, obj):
        center_id = obj.center_id
        
        return Member.objects.filter(center_id=center_id).count()
    
    def get_monthly_revenue_estimate(self, obj):
        center_id = obj.center_id
        passes = Pass.objects.filter(center_id=center_id)
        monthly_revenue_estimate = 0

        today = datetime.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end_of_month = (start_of_month + timedelta(days=31)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        payments =  Payments.objects.filter(
            center_id=center_id,
            category='etc',
            payment_status='completed',
            payment_date__gte=start_of_month,
            payment_date__lt=end_of_month
            ).values('amount').aggregate(total=Sum('amount'))['total']
        if payments and payments > 0:
            monthly_revenue_estimate += payments

        for pass_info in passes:
            pass_id = pass_info.pass_id
            monthly_revenue = pass_info.monthly_revenue
            duration_months = pass_info.duration_months

            payments = Payments.objects.filter(
                pass_id=pass_id,
                payment_status='completed',
                payment_date__lte=timezone.now(),
            ).annotate(
                weighted_revenue=F('amount') / duration_months
            ).aggregate(
                total_weighted_revenue=Sum('weighted_revenue')
            )['total_weighted_revenue']

            if payments and duration_months > 0:
                monthly_revenue_estimate += payments

        return monthly_revenue_estimate
    
    def get_total_revenue(self, obj):
        center_id = obj.center_id
        payments = Payments.objects.filter(center_id=center_id, payment_status='completed')
        total_revenue = payments.aggregate(total=Sum('amount'))['total']
        
        return total_revenue


class PassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pass
        fields = '__all__'
    
class PassStatusSerializer(serializers.ModelSerializer):
    number_of_users = serializers.SerializerMethodField()
    usage_rate = serializers.SerializerMethodField()
    
    class Meta:
        model = Pass
        fields = '__all__'
    
    def get_number_of_users(self, obj):
        pass_id = obj.pass_id
        users = Member.objects.filter(pass_id=pass_id)
        
        return users.count()
    
    def get_usage_rate(self, obj):
        pass_id = obj.pass_id
        center_id = obj.center_id
        total_users = Member.objects.filter(center_id=center_id).count()
        users = Member.objects.filter(pass_id=pass_id).count()

        if users > 0:
            return round((users / total_users) * 100, 1)
        else:
            return 0

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class InstroctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instroctor
        fields = '__all__'

class PaymentsSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Payments
        fields = '__all__'

    def get_user_name(self, obj):
        user_id = obj.user_id
        user = User.objects.get(username=user_id)
        return user.name

class UserPassSerializer(serializers.ModelSerializer):
    pass_info = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = '__all__'
        
    def get_pass_info(self, obj):
        pass_id = obj.pass_id
        try:
            center_pass = Pass.objects.get(pass_id=pass_id)
            return PassSerializer(center_pass).data
        except Pass.DoesNotExist:
            return None