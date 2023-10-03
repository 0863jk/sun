import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
    
class User(AbstractUser):
    ROLE_CHOICES = (('manager', '매니저'),
                    ('instroctor', '강사'),
                    ('general', '일반사용자'))
    name = models.CharField(max_length=150, unique=False, verbose_name='name')
    phone1 = models.CharField(null=False, blank=False, unique=False, max_length=255)
    phone2 = models.CharField(null=False, blank=False, unique=False, max_length=255)
    phone3 = models.CharField(null=False, blank=False, unique=False, max_length=255)
    role = models.CharField(choices=ROLE_CHOICES, null = False, max_length=255)
    
    def __str__(self):
        return self.username