from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from base.models import CustomerProfile,AirlineCompany
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from ..serializers import AirlineSerializer, CustomerProfileSerializer, UserInfoSerializer ,UsersSerSerializer


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
                            password=request.data['password'], 
                            is_staff=request.data['is_staff'],
                            is_superuser=request.data['is_superuser'])
    except:
        return Response({"User already exists ":request.data['username']})
    return JsonResponse({"user added":request.data['username']} )
 
# add profile to user
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
 
#   get user info, specific to the one logged in with
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    print("innnn")
    user = request.user
    print(user)
    users = User.objects.all()
    print(users)
    serializer = UserInfoSerializer(users, many=True)
    return Response(serializer.data)
 
# add airline to user specific
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addAirlineForUSER(request):
    user = request.user
    if user.is_staff :
        print ("continue....")
    AirlineCompany.objects.create(airline_name=request.data['airline_name'] ,country_id=request.data['country_id'],user=user)
    print(user)
    # airlines = user.airline_set.all()
    # print(airlines)
    # serializer = ProductSerializer(products, many=True)
    return Response({"airline added":request.data['airline_name']})

#  get airline info for user(through user info which is foreign key connected to airline)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAirlines(request):
    print("innnn")
    user = request.user
    print(user)
    airlines = user.airlinecompany_set.all()
    print(airlines)
    serializer = AirlineSerializer(airlines, many=True)
    return Response(serializer.data)



# get customerprofile info for user - not working, tryin to get single field data with error
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






# get all users - restricted to admin
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getAllUsers(request):
    user = request.user
    res=[]
    if user.is_superuser :
        allUsers= User.objects.all()
        for eachUser in allUsers:
            res.append(UsersSerSerializer(eachUser))
        return JsonResponse(res,safe=False)
    else:
        return Response({"access to display all users is restricted to admin":user.username})

