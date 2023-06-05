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
    constraints = models.IntegerField(null=True, blank=True) # 횟수
    price = models.IntegerField()

    def __str__(self):
        return self.planid
    
class CenterMember(models.Model):
    centerid = models.CharField(max_length=200)
    userid = models.CharField(max_length=200, null = False, blank = True)
    role = models.CharField(null = False, max_length=255)

    planid = models.IntegerField(null = True) # 이용 중인 이용권
    register_date = models.DateField(null=False) # 등록일
    expire_date = models.DateField(null=False) # 만료일

    def __str__(self):
        return self.id

class Lesson(models.Model):
    id = models.AutoField(primary_key=True)
    centerid = models.CharField(max_length=200)
    # 기본 정보
    title = models.CharField(max_length=200)
    summay = models.CharField(max_length=200)

    # 등록할 때 사용될 수 있는 정보
    # 등록 정보
    info_day = models.IntegerField(null=True) # 요일
    info_start = models.TimeField(null=True)
    info_end = models.TimeField(null=True)
    info_max_capacity = models.IntegerField(null=True) # 최대 인원 
    # 트레이너 정보
    info_trainername = models.CharField(max_length=200, null=True) # 트레이너 이름
    info_trainerid = models.CharField(max_length=200, null=True) # 트레이너 아이디

# 실제 시간표에 등록되는 정보
class TimetableBlock(Lesson):
    blockid = models.AutoField(primary_key=True)
    lessonid = models.IntegerField(null = True) # 외래키
    
    start = models.DateTimeField()
    end = models.DateTimeField()

    trainername = models.CharField(max_length=200, null=True)
    trainerid = models.CharField(max_length=200, null=True)
    
    max_capacity = models.IntegerField(default=999)
    number_of_applicants = models.IntegerField(default=0)

class Enrolment(models.Model):
    blockid = models.IntegerField(null = False)
    userid = models.CharField(max_length=200, null=True) # 수강생 id
    # attendance = models.