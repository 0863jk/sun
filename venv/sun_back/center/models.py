from django.conf import settings
from django.db import models
from django.utils import timezone

class Center(models.Model):
    centername = models.CharField(max_length=200)
    centerid = models.CharField(max_length=200, primary_key=True)
    password = models.CharField(max_length=200)
    introduction = models.CharField(max_length=200)
    manager = models.CharField(max_length=200)
    # manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address1 = models.CharField(max_length=200)
    address2 = models.CharField(max_length=200, null=True)
    bizid = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.centerid
    
class Plan(models.Model):
    PLAN_TYPE = (('fixed-term', '기간제'), ('number-of-times', '횟수제'))
    PERIOD_TYPE = (('days', '일'), ('months', '개월'), ('years', '년'))

    planid = models.AutoField(primary_key=True)
    planname = models.CharField(max_length=200)
    centerid = models.CharField(max_length=200)
    introduction = models.CharField(max_length=200)
    plantype = models.CharField(choices=PLAN_TYPE, null = False, max_length=255)
    period = models.IntegerField()
    periodtype = models.CharField(choices=PERIOD_TYPE, null = False, max_length=255)
    times = models.IntegerField(null=True, blank=True) # 횟수제
    constraints = models.CharField(max_length=200,null=True, blank=True) # 기간제
    price = models.IntegerField()

    def __str__(self):
        return self.planid
    
class Member(models.Model):
    centerid = models.CharField(max_length=200)
    userid = models.CharField(max_length=200, null = False, blank = True)
    role = models.CharField(null = False, max_length=255)

    planid = models.IntegerField(null = True) # 이용 중인 이용권
    register_date = models.DateField(null=True) # 등록일
    expire_date = models.DateField(null=True) # 만료일

    def __str__(self):
        return self.id