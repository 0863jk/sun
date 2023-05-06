from django.conf import settings
from django.db import models
from django.utils import timezone

class Center(models.Model):
    centername = models.CharField(max_length=200)
    introduction = models.CharField(max_length=200)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    members = models.IntegerField()
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.centername