from django.urls import path 
from . import views 
from django.contrib.auth import views as auth_views


urlpatterns = [
    path("", views.toLogin, name="login"),
    path("login/", views.toLogin, name="login"),
    path("callback/", views.callback, name="callback"),
    path("todo_form/", views.todo_form, name="todo-form"),
    path("task/<int:pk>/update", views.update_todo, name="update-todo"),
    path("task/<int:pk>/delete", views.delete_todo, name="delete-todo"),
    path("logout/", views.my_logout, name="logout"),
    
]