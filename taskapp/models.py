from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings


# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class CustomUser(AbstractUser):
    phone_number = models.TextField(max_length=15, default=123456789)
    job = models.TextField(blank=True, null=True)
    has_filled_additional_info = models.BooleanField(default=False)    

    def __str__(self):
        return self.job
