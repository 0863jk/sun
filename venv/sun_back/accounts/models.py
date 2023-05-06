from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
    
class User(AbstractUser):
    # REQUIRED_FIELDS = ['password', 'email', 'name', 'phone']
    ROLE_CHOICES = (('manager', '매니저'),
                    ('trainer', '트레이너'),
                    ('general', '일반사용자'))
    username = models.CharField(max_length=150, unique=False, verbose_name='username')
    # email = models.EmailField(unique=True, verbose_name=("Email Address"))
    phone = models.CharField(null=False, blank=False, unique=False, max_length=255)
    # 기본적으로 제공하는 필드 외에 원하는 필드를 적어준다.
    role = models.CharField(choices=ROLE_CHOICES, null = True, blank = True, max_length=255)