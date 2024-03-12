from .models import User
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    phone1 = serializers.CharField(required=True)
    phone2 = serializers.CharField(required=True)
    phone3 = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        data['name'] = data['last_name'] + data['first_name']
        data['phone1'] = self.validated_data.get('phone1', '')
        data['phone2'] = self.validated_data.get('phone2', '')
        data['phone3'] = self.validated_data.get('phone3', '')
        data['role'] = self.validated_data.get('role', '')
        return data
    
    def save(self, request):
        user = super().save(request)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.name = self.cleaned_data['name']
        user.phone1 = self.cleaned_data['phone1']
        user.phone2 = self.cleaned_data['phone2']
        user.phone3 = self.cleaned_data['phone3']
        user.role = self.cleaned_data['role']

        user.save()
        return user
    
class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'name', 'email', 'role', 'phone1', 'phone2', 'phone3')
