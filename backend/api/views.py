from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import TaskSerializer
from .models import Task, CustomUser
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication, SessionAuthentication


class CasdoorAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]
        payload = decode_token(token)

        if not payload:
            raise AuthenticationFailed("Invalid token")

        user, _ = CustomUser.objects.get_or_create(username=payload["name"])
        return (user, None)

def decode_token(token):
    try:
        decoded = jwt.decode(token, options={"verify_signature": False})
        return decoded
    except jwt.InvalidTokenError as e:
        print(f"Error decoding token: {e}")
        return None
    

class TaskListCreateView(ListCreateAPIView):
        authentication_classes = [ CasdoorAuthentication, SessionAuthentication ]
        permission_classes=[ IsAuthenticated ]
        serializer_class = TaskSerializer

        def get_queryset(self):
                return Task.objects.filter(user=self.request.user)

        def perform_create(self, serializer):
                serializer.save(user=self.request.user)

       
class TaskRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    authentication_classes = [ CasdoorAuthentication, SessionAuthentication ]
    permission_classes=[ IsAuthenticated ]
    queryset = Task.objects.all() 

    def perform_update(self, serializer): 
        serializer.save(user=self.request.user)
        
    def perform_destroy(self, instance):
        instance.delete()
        



