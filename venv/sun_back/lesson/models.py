from django.db import models

# Create your models here.
# 레슨 프리셋
class Lesson(models.Model):
    lessonid = models.AutoField(primary_key=True)
    centerid = models.CharField(max_length=200)
    # 기본 정보
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=200, null=True)

    # 등록할 때 사용될 수 있는 정보
    # 등록 정보
    info_day = models.IntegerField(null=True) # 요일
    info_start = models.TimeField(null=True)
    info_end = models.TimeField(null=True)
    info_max_capacity = models.IntegerField(null=True) # 최대 인원 
    # 트레이너 정보
    info_trainername = models.CharField(max_length=200, null=True) # 트레이너 이름
    info_trainerid = models.CharField(max_length=200, null=True) # 트레이너 아이디
    
    def __str__(self):
        return self.lessonid

# 실제 시간표에 등록되는 정보
class TimetableBlock(models.Model):
    blockid = models.AutoField(primary_key=True)
    centerid = models.CharField(max_length=200)
    lessonid = models.IntegerField(null=True)

    # 기본 정보
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=200, null=True)
    # 시간 정보
    start = models.DateTimeField()
    end = models.DateTimeField()
    # 트레이너 정보
    trainername = models.CharField(max_length=200, null=True)
    trainerid = models.CharField(max_length=200, null=True)
    
    max_capacity = models.IntegerField(default=999)
    number_of_applicants = models.IntegerField(default=0)
    
    def __str__(self):
        return self.blockid

# 수강신청 정보
class Enrolment(models.Model):
    centerid = models.CharField(max_length=200)
    blockid = models.IntegerField(null = False)
    lessonid = models.IntegerField(null = True)
    userid = models.CharField(max_length=200, null=False) # 수강생 id
    attendance = models.BooleanField(default=False) # 출석 여부: 기본 = False
    
    def __str__(self):
        return self.id

# 강의평
class LessonReview(models.Model):
    centerid = models.CharField(max_length=200)
    userid = models.CharField(max_length=200, null=False)
    blockid = models.IntegerField(null = False)
    lessonid = models.IntegerField(null = True)
    difficulty = models.IntegerField(null = True)
    teaching = models.IntegerField(null = True)
    recommend = models.IntegerField(null = True)
    comment = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return self.id