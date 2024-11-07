from django.urls import path 
from . import views 
from django.contrib.auth import views as auth_views
from django.conf.urls.i18n import set_language

urlpatterns = [
    path("", views.toLogin, name="login"),
    path("login/", views.toLogin, name="login"),
    path("callback/", views.callback, name="callback"),
    # path("todo_form/", views.todo_form, name="todo-form"),
    # path("task/<int:pk>/update", views.update_todo, name="update-todo"),
    # path("task/<int:pk>/delete", views.delete_todo, name="delete-todo"),
    path("logout/", views.my_logout, name="logout"),
    path('set_language/', set_language, name='set_language'),
    path("additional-info", views.additional_info, name="additional_info")
    
]