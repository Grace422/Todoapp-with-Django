from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.conf import settings

    
class CustomUser(AbstractUser):
    phone_number = models.TextField(max_length=15, default=123456789)
    job = models.TextField(blank=True, null=True)
    has_filled_additional_info = models.BooleanField(default=False)    

    def __str__(self):
        return self.username
