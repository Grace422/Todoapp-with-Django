"""todo_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView


urlpatterns = i18n_patterns(
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('', include('taskapp.urls')),
    path('api_schema/', get_schema_view(
        title='API Schema',
        description='Guide for the REST API'
    ),  name='api_schema'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='docs.html',
        extra_context={'schema_url':'api_schema'}
    ),  name='swagger-ui'),
    path('i18n/', include('django.conf.urls.i18n')),
    # path('casdoor/', include('casdoor_auth.urls')),
)
