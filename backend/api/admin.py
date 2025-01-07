from django.contrib import admin
from .models import Task
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    search_fields = ('title', 'user_username')
    list_filter = ('user', 'created_at')


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'last_login', 'date_joined')

admin.site.register(CustomUser, CustomUserAdmin)
    

