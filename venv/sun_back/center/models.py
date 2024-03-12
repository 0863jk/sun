from django.conf import settings
from django.db import models
from django.utils import timezone

class Center(models.Model):
    center_id = models.CharField(max_length=200, primary_key=True)
    center_name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    manager_id = models.CharField(max_length=200)
    # manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    manager_name = models.CharField(max_length=200)
    address1 = models.CharField(max_length=200)
    address2 = models.CharField(max_length=200, null=True)
    business_number = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.center_id
    
class Pass(models.Model):
    PASS_TYPE = (('all_programs', 'all programs'), ('only_private_lesson', 'only private lesson'), ('only_public_class', 'only public class'))
    UNIT_OF_TIMES = (('total', '총'), ('week', '주'), ('month', '월'))

    pass_id = models.AutoField(primary_key=True) # 수강권 아이디
    pass_name = models.CharField(max_length=200) # 수강권 이름
    center_id = models.CharField(max_length=200) # 센터 아이디
    description = models.CharField(max_length=200) # 설명
    pass_type = models.CharField(choices=PASS_TYPE, null = False, max_length=255) # 수강권 종류 - 수강 가능한 프로그램 종류
    duration_months = models.IntegerField() # 수강권 유효기간 (개월 단위)
    price = models.IntegerField() # 가격
    monthly_revenue = models.FloatField() # 월 단위로 분할된 가격
    unit_of_times = models.CharField(choices=UNIT_OF_TIMES, null = False, max_length=255) # 횟수 단위
    times = models.IntegerField(null=True, blank=True) # 횟수

    def __str__(self):
        return self.pass_id
    
class Member(models.Model):
    center_id = models.CharField(max_length=200)
    user_id = models.CharField(max_length=200, null = False, blank = True)

    pass_id = models.IntegerField(null = True) # 이용 중인 이용권
    register_date = models.DateField(null=True) # 등록일
    expire_date = models.DateField(null=True) # 만료일

    renewal_count = models.IntegerField(null=True, default=0) # 연장 횟수

    def __str__(self):
        return self.id
    
class Instroctor(models.Model):
    center_id = models.CharField(max_length=200)
    user_id = models.CharField(max_length=200, null=False)

    program_management_permissions = models.BooleanField(default=False)
    member_management_permissions = models.BooleanField(default=False)
    pass_management_permissions = models.BooleanField(default=False)

    def __str__(self):
        return self.id

class Payments(models.Model):
    CATEGORY = (('register', '등록'), ('etc', '외'))
    PAYMENT_METHOD = (('auto_created', '자동 등록'), ('user_created', '유저 등록'))
    PAYMENT_STATUS = (('completed', '완료'), ('canceled', '취소'))

    payment_id = models.AutoField(primary_key=True) # 고유한 식별자 (Primary Key)
    center_id = models.CharField(max_length=200, null = False, blank = False) # 사용자 또는 수강생과 연결된 외래 키 (Foreign Key)
    pass_id = models.IntegerField(null = True)# 수강권과 연결된 외래 키 (Foreign Key)
    user_id = models.CharField(max_length=200, null = False, blank = False) # 사용자 또는 수강생과 연결된 외래 키 (Foreign Key)
    category = models.CharField(choices=CATEGORY, max_length=200) # 결제 방법
    amount = models.IntegerField() # 결제 금액
    payment_date = models.DateField(null=True) # 결제 날짜
    payment_method = models.CharField(choices=PAYMENT_METHOD, max_length=200) # 결제 방법
    payment_status = models.CharField(choices=PAYMENT_STATUS, max_length=200) # 결제 상태

    def __str__(self):
        return self.payment_id