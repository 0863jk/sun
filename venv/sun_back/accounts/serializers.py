from .models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
