from django.urls import path 
from . import views 

urlpatterns = [
    path("task-create/", views.CreateTaskView.as_view(), name="task-create"),
    path("task-list/", views.taskList, name="task-list"),
    path("task-update/<int:pk>/", views.taskUpdate, name="task-update"),
    path("task-delete/<int:pk>/", views.taskDelete, name="task-delete"),
    
]