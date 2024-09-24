from django.shortcuts import render, redirect
from .models import Task
from .forms import TaskForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import requests
import jwt
from jwt import InvalidTokenError


# Create your views here.
@login_required
def todo_form(request):
    tasks = Task.objects.filter(user=request.user)
    form = TaskForm()
    if request.method=='POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save(commit=False)  
            task.user = request.user  
            task.save()
            return redirect("todo-form")
    context = {"tasks":tasks, "form": form}
    return render(request, "todo_form.html", context)


@login_required
def update_todo(request, pk):
    task = Task.objects.get(Task, id=pk, user=request.user)
    form = TaskForm(instance=task)
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect("todo-form")
            
    context = {"form": form}
    return render(request, "todo_form.html", context)


@login_required
def delete_todo(request, pk):
    task = Task.objects.get(Task, id=pk, user=request.user)
    if request.method == 'POST':
        task.delete()
        return redirect("todo-form")
    context = {"task": task}
    return render(request, "delete_todo.html", context)


# def my_login(request):
#     if request.method == "POST":
#         username = request.POST["username"]
#         password = request.POST["password"]
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return redirect("todo-form")
#         else:
#             return redirect("login")
#     else:
#         return render(request, "authentication/login.html")


from django.conf import settings
# from casdoor import CasdoorSDK
from django.contrib.auth import get_user_model
print(settings.CASDOOR_CLIENT_ID)

User = get_user_model()

def toLogin(request):
    authorization_url = (
        f"{settings.CASDOOR_AUTHORIZATION_ENDPOINT}?"
        f"response_type=code&client_id={settings.CASDOOR_CLIENT_ID}&"
        f"redirect_uri={settings.CASDOOR_REDIRECT_URI}&state=application_todo_app"
    )
    return redirect(authorization_url)

def decode_access_token(token:str):
    try:
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        return decoded_token
    except InvalidTokenError:
        return None

def callback(request):
    code = request.GET.get('code')

    # Échanger le code contre un token
    
    token_response = requests.post(
        settings.CASDOOR_TOKEN_ENDPOINT,
        data={
            'grant_type': 'authorization_code',
            'client_id': settings.CASDOOR_CLIENT_ID,
            'client_secret': settings.CASDOOR_CLIENT_SECRET,
            'code': code,
            'redirect_uri': settings.CASDOOR_REDIRECT_URI,
        }
    )

    token_json = token_response.json()
    access_token = token_json.get('access_token')

    print(f"Access token: {access_token}")

    decoded_token = decode_access_token(access_token)

    if decoded_token:
        username = decoded_token.get("name")
        email = decoded_token.get("email")

        user, created = User.objects.get_or_create(username=username, email=email)

        if created:
            user.set_unusable_password()
            user.save()
        
        if user is not None:
            login(request, user)
            return redirect("todo-form")
        
        raise Exception("Failed to authenticate user")


    return redirect("todo-form")
  


def my_logout(request):
    logout(request)
    return render(request, "logout.html")