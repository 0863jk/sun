from .models import User
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    def get_cleaned_data(self):
        super().get_cleaned_data()
        self.cleaned_data['name'] = self.validated_data.get('name', '')
        self.cleaned_data['phone'] = self.validated_data.get('phone', '')
        self.cleaned_data['role'] = self.validated_data.get('role', '')
        return self.cleaned_data
    
    def save(self, request):
        user = super().save(request)
        user.name = self.cleaned_data['name']
        user.phone = self.cleaned_data['phone']
        user.role = self.cleaned_data['role']
        # user.phone_number = self.cleaned_data['phone_number']
        user.save()
        return user

        # return data

        # return {
        #     'name': self.validated_data.get('name', ''), # Custom field
        #     'phone': self.validated_data.get('phone', ''), # Custom field
        #     'role' : self.validated_data.get('role', '') # Custom field
        # }