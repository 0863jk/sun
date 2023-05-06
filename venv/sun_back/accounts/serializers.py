from rest_framework import serializers
from .models import User

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=True)
    phone = serializers.CharField()
    role = serializers.CharField()

    def custom_signup(self, request, user):
        user.name = self.validated_data.get('name')
        user.phone = self.validated_data.get('phone')
        user.role = self.validated_data.get('role')
        user.save()