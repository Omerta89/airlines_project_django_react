from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from base.models import Country, CustomerProfile, AirlineCompany, Flight, Ticket
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from ..serializers import AirlineSerializer, CountrySerializer, CustomerProfileSerializer, FlightSerializer, TicketSerializer, UserInfoSerializer, UsersSerSerializer

# starter page
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh', ]
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
        return JsonResponse({"user added": request.data['username']})
    except:
        return Response({"User already exists ": request.data['username']})



#   PROFILE

#   get all profile info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllProfilesInfo(request):
    user = request.user
    if user.is_superuser:
        profiles = CustomerProfile.objects.all()
        serializer = CustomerProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    else:
        return Response({"access to display all profiles is restricted to admin": user.username})


# add profile to user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProfile(request):
    user = request.user
    try:
        CustomerProfile.objects.create(
            phone_num=request.data['phone_num'], credit_card=request.data['credit_card'], address=request.data['address'], user=user)
        return Response({"Profile created": user.username})
    except:
        return Response({"Profile already exist ": user.username})
    # Profile.objects.get(user_id=user.id)

# get customerprofile info for user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCustomerProfile(request):
    user = request.user
    profile = user.customerprofile_set.all()
    serializer = CustomerProfileSerializer(profile, many=True)
    return Response(serializer.data)


#   USER

#   get all user info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = request.user
    if user.is_superuser:
        users = User.objects.all()
        serializer = UserInfoSerializer(users, many=True)
        return Response(serializer.data)
    else:
        return Response({"access to display all users is restricted to admin": user.username})



# get all users - func. seri, +restricted to admin
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllUsers(request):
    user = request.user
    res = []
    if user.is_superuser:
        allUsers = User.objects.all()
        for eachUser in allUsers:
            res.append(UsersSerSerializer(eachUser))
        return JsonResponse(res, safe=False)
    else:
        return Response({"access to display all users is restricted to admin": user.username})




#   AIRLINE


#   get all airline info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllAirlinesInfo(request):
    user = request.user
    if user.is_superuser:
        airlines = AirlineCompany.objects.all()
        serializer = AirlineSerializer(airlines, many=True)
        return Response(serializer.data)
    else:
        return Response({"access to display all airline companies is restricted to admin": user.username})



# add airline to user specific
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addAirlineForUSER(request):
    user = request.user
    try:
        if user.is_staff:
            AirlineCompany.objects.create(
            airline_name=request.data['airline_name'], country_id=request.data['country_id'], user_id=user.id)
            return Response({ f"{request.data['airline_name']} added to {user.username}: succeeded"})
        else:
            return Response({"access to attach airline to user is restricted to staff": user.username})
    except:
        return Response({"attaching airline to user didnt work because of unique constraint, user already has airline profile": user.username})



#  get airline info specific for user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAirlines(request):
    user = request.user
    airlines = user.airlinecompany_set.all()
    serializer = AirlineSerializer(airlines, many=True)
    return Response(serializer.data)


#       FLIGHT

#   get all flight info
@api_view(['GET'])
def getAllFlightsInfo(request):
    flights = Flight.objects.all()
    serializer = FlightSerializer(flights, many=True)
    return Response(serializer.data)


# add flight to airline_company
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFlight(request):
    user = request.user
    print(user.id)
    # if user.is_staff:
    # try:
    Flight.objects.create(
            departure_time=request.data['departure_time'],landing_time=request.data['landing_time'],
            remaining_tickets=request.data['remaining_tickets'],
            destination_country = Country.objects.get(_id=request.data['destination_country']),
            origin_country_id=request.data['origin_country'],
            airline_company=AirlineCompany.objects.get(_id=user.id))
    return Response(f"flight added by {user.username} going to country id={Country.objects.get(_id=request.data['destination_country'])}")
    # except:
    #     return Response("something failed")
    # else:
    #     return Response({"access to add flight is restricted to staff": user.username})


# SomeModel.objects.filter(id=id).delete()
@api_view(['DELETE'])
def deleteFlight(request,_id):
    try:
        # Flight.objects.delete()
        # Flight.objects.delete(
        #         flight_id=Flight.objects.get(_id=id))
        # print(Flight.objects.get(_id=request.id))
        print({_id.id})
        # print(flight_id=Flight.objects.get(_id=_id.id))
        return Response({f"flight deleted"})
    except:
        print(Flight.objects.get(_id=id))
        return Response({"something failed"})




#       TICKET

#   get all ticket info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllTicketsInfo(request):
    user = request.user
    if user.is_superuser:
        tickets = Ticket.objects.all()
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)
    else:
        return Response({"access to display all tickets is restricted to admin": user.username})




# add ticket to profile --- how to connect customer and flight foreign key??
# stage2:when ticket added, it needs to update remaining tickets of flight model
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTicketForProfile(request):
    # try:
        user = request.user
        print(user.customerprofile_set.all().count)
        if (user.customerprofile_set.all().count): #returns empty array, how to check if array not empty?
            Ticket.objects.create(
                customer=request.data['country_id'], 
                flight=request.data['country_id'], 
                user_id=user.id)
            return Response({"ticket added": user.username})
        else:
            return Response({"something went wrong, maybe Profile already has ticket ": user.username})
    # except:
    #     return Response({"Profile already has ticket ": user.username})



#       COUNTRY

#   get all country info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllCountrysInfo(request):
    user = request.user
    if user.is_superuser:
        countrys = Country.objects.all()
        serializer = CountrySerializer(countrys, many=True)
        return Response(serializer.data)
    else:
        return Response({"access to display all countries is restricted to admin": user.username})

# add country
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCountry(request):
    try:
        Country.objects.create(
                country_name=request.data['country_name'])
        return Response({"country added": request.data['country_name']})
    except:
        return Response({"country already exists": request.data['country_name']})



