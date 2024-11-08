from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from .serializers import TaskSerializer
from .models import Task
from rest_framework.decorators import api_view, permission_classes



class CreateTaskView(CreateAPIView):

        # permission_classes=[
        #         IsAuthenticated
        # ]
        queryset = Task.objects.all()
        serializer_class = TaskSerializer

        def create(self, request, *args, **kwargs):
                serializer = TaskSerializer(data=request.data)

                if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=200)
                print("error", serializer.errors)
                return Response(serializer.errors, status=400)




# Create your views here.
#@permission_classes([IsAuthenticated])
@api_view(['GET'])
def taskList(request):
                # user_id = request.user.id
                #task = Task.objects.filter(user=request.user).order_by('-id')
                task = Task.objects.all()
                serializer = TaskSerializer(task, many=True)
                return Response(serializer.data, status=200)
                # return Response(serializer.errors, status=400)

# @permission_classes([IsAuthenticated])
# @api_view(['POST'])
# def taskCreate(request):
#         serializer = TaskSerializer(data=request.data)

#         if serializer.is_valid():
#                 serializer.save(user=request.user)
#                 return Response(serializer.data, status=200)
#         return Response(serializer.errors, status=400)





# @permission_classes([IsAuthenticated])
@api_view(['PUT'])
def taskUpdate(request, pk): 
        task = Task.objects.get(pk=pk)
        
        serializer = TaskSerializer(instance=task, data=request.data)

        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)  
        return Response(serializer.errors, status=400)
    

# @permission_classes([IsAuthenticated]) 
@api_view(['DELETE'])
def taskDelete(request, pk):
        task = Task.objects.get(pk=pk)

        task.delete()
        return Response({"detail": "Task deleted successfully."}, status=200)
        