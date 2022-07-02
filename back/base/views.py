from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
 
 
from .serializers import NoteSerializer
from base.models import Note
 
 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        # ...
 
        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
 
 
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
 
    return Response(routes)
 
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    print("innnn")
    user = request.user
    print(user)
    notes = user.note_set.all()
    print(notes)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
 
 
# register
def addUser(request):
    User.objects.create_user(username='john2311',
                                 email='jlen34non@beatl1es1.com',
                                 password='gl44ass onion11')
    return JsonResponse({"done":"tes"} )
 
 
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNote(request):
    print(request.data)
    user = request.user
    Note.objects.create(body=request.data["notebody"],user=user)
    print(user)
    notes = user.note_set.all()
    print(notes)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
