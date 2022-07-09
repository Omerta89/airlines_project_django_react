from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from base.models import CustomerProfile,Airline
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import AirlineSerializer, CustomerProfileSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',]
    return Response(routes) 
 
# login
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
    
    
# signup
@api_view(['POST'])
def addUser(request):
    try:
        User.objects.create_user(username=request.data['username'],
                            email=request.data['email'],
                            password=request.data['password'], is_staff=True)
    except:
        return Response({"User already exists ":request.data['username']})
    return JsonResponse({"user added":request.data['username']} )
 
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProfile(request):
    user = request.user
    try:
        CustomerProfile.objects.create(phone_num=request.data['phone_num'],credit_card=request.data['credit_card'],address=request.data['address'],user=user)
    except:
        return Response({"Profile already exist ":user.username})    
    # Profile.objects.get(user_id=user.id)
    return Response({"Profile created":user.username})
 
 
 
 
 
 
#   get all airline info

 
 
 
#  #   get all airline info (through user info which is foreign key connected to airline)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAirlines(request):
    print("innnn")
    user = request.user
    print(user)
    # print(user.airline)
    airlines = user.airline_set.all()
    # airlines = user.airline.country
    print(airlines)
    serializer = AirlineSerializer(airlines, many=True)
    return Response(serializer.data)

 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCustomerProfile(request):
    print("innnn")
    user = request.user
    print(user)
    profile = user.customerprofile_set.all()
    print(profile)
    serializer = CustomerProfileSerializer(profile, many=True)
    return Response(serializer.data)





 
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addNote(request):
#     print(request.data)
#     user = request.user
#     Note.objects.create(body=request.data["notebody"],user=user)
#     print(user)
#     notes = user.note_set.all()
#     print(notes)
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)
