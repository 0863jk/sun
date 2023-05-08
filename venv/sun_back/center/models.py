from django.conf import settings
from django.db import models
from django.utils import timezone

class Center(models.Model):
    centername = models.CharField(max_length=200)
    centerid = models.CharField(max_length=200)
    introduction = models.CharField(max_length=200)
    manager = models.CharField(max_length=200, null = True, blank = True)
    # manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=200, null = True, blank = True)
    password = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.centername
    
class CenterPlan(models.Model):
    SYSTEM_CHOICE = (('fixed-term', '기간제'),
                    ('number-of-times', '횟수제'))
    planid = models.IntegerField(auto_created=True, unique=True)
    planname = models.CharField(max_length=200)
    centerid = models.CharField(max_length=200)
    period = models.CharField(max_length=200)
    plantype = models.CharField(choices=SYSTEM_CHOICE, null = False, max_length=255)
    constraints = models.CharField(max_length=200)

    def __str__(self):
        return self.centername
    
# class CenterMember(models.Model):
#     centername = models.CharField(max_length=200)
#     introduction = models.CharField(max_length=200)
#     manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     location = models.CharField(max_length=200)
#     created_date = models.DateTimeField(default=timezone.now)

#     def __str__(self):
#         return self.centername