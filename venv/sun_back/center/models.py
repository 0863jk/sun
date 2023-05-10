from django.conf import settings
from django.db import models
from django.utils import timezone

class Center(models.Model):
    centername = models.CharField(max_length=200)
    centerid = models.CharField(max_length=200, unique=True)
    introduction = models.CharField(max_length=200)
    manager = models.CharField(max_length=200, null = True, blank = True)
    # manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=200, null = True, blank = True)
    password = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.centerid
    
class CenterPlan(models.Model):
    SYSTEM_CHOICE = (('fixed-term', '기간제'),
                    ('number-of-times', '횟수제'))
    planid = models.AutoField(primary_key=True)
    planname = models.CharField(max_length=200)
    centerid = models.CharField(max_length=200)
    plantype = models.CharField(choices=SYSTEM_CHOICE, null = False, max_length=255)
    period = models.CharField(max_length=200)
    constraints = models.CharField(max_length=200)
    price = models.IntegerField()

    def __str__(self):
        return self.planid
    
class CenterTrainer(models.Model):
    centerid = models.CharField(max_length=200)
    userid = models.CharField(max_length=200, null = True, blank = True)

    def __str__(self):
        return self.id
    
class CenterMember(models.Model):
    centerid = models.CharField(max_length=200)
    userid = models.CharField(max_length=200, null = True, blank = True)
    planid = models.IntegerField()
    # registerDate = models.DateTimeField

    def __str__(self):
        return self.id
    