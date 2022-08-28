import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from base.models import Country, CustomerProfile, AirlineCompany, Flight, Ticket
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from ..serializers import AirlineSerializer, CountrySerializer, CustomerProfileSerializer, FlightSerializer, TicketSerializer, UserInfoSerializer, UsersSerSerializer, aircompanyIdToNameSerializer


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
        token['is_staff'] = user.is_staff
        token['is_active'] = user.is_active
        token['is_superuser'] = user.is_superuser
        try:
            CustomerProfile.objects.get(user=user)
            token['is_customer'] = True
        except:
            token['is_customer'] = False
        # ...
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# signup
@api_view(['POST'])
def addUser(request):
    # try:
    User.objects.create_user(username=request.data['username'],
                             email=request.data['email'],
                             password=request.data['password'],
                             is_staff=request.data['is_staff'],
                             is_superuser=request.data['is_superuser'])
    return JsonResponse({"user added": request.data['username']})
    # except:
    #     return Response({"User already exists ": request.data['username']})


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
    CustomerProfile.objects.create(
        phone_num=request.data['phone_num'], credit_card=request.data['credit_card'], address=request.data['address'], user=user)
    return Response({"Profile created": user.username})


# get customerprofile info for user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCustomerProfile(request):
    user = request.user
    profile = CustomerProfile.objects.get(user=user)
    serializer = CustomerProfileSerializer(profile)
    return Response(serializer.data)


# Update CustomerProfile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updCustomerProfile(request):
    user = request.user
    temp = CustomerProfile.objects.get(user=user)
    temp.address = request.data['address']
    temp.phone_num = request.data['phone_num']
    temp.credit_card = request.data['credit_card']

    Dict_serving_updCustomerProfile = {
        "address": temp.address,
        "phone_num": temp.phone_num,
        "credit_card": temp.credit_card,
        'user': user}
    temp.save()
    return JsonResponse(Dict_serving_updCustomerProfile)


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
            return Response({f"{request.data['airline_name']} added to {user.username}: succeeded"})
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




# add flight (generally)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFlight(request):
    user = request.user
    print(user.id)
    # if user.is_staff:
    # try:
    _addFlight = Flight.objects.create(
        departure_time=request.data['departure_time'],
        landing_time=request.data['landing_time'],
        remaining_tickets=request.data['remaining_tickets'],
        destination_country=Country.objects.get(
            country_name=request.data['destination_country']),
        origin_country=Country.objects.get(
            country_name=request.data['origin_country']),
        airline_company=AirlineCompany.objects.get(airline_name=request.data['airline_company']))
    Dict_serving_addFlight = {
        "landing_time": request.data['landing_time'],
        "departure_time": request.data['departure_time'],
        "remaining_tickets": request.data['remaining_tickets'],
        "airline_company": request.data['airline_company'],
        "_id": _addFlight.pk,
        "destination_country": request.data['destination_country'],
        "origin_country": request.data['origin_country']}
    return Response(Dict_serving_addFlight)
    # except:
    #     return Response("something failed")
    # else:
    #     return Response({"access to add flight is restricted to staff": user.username})


#  Delete Flight
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFlight(request, id):
    Flight.delete(Flight.objects.get(_id=id))
    return Response({"flight deleted": id})


# Update Flight
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updFlight(request, id):
    temp = Flight.objects.get(_id=id)
    temp.landing_time = request.data['landing_time']
    temp.departure_time = request.data['departure_time']
    temp.remaining_tickets = request.data['remaining_tickets']
    temp.destination_country = Country.objects.get(
        country_name=request.data['destination_country'])
    temp.origin_country = Country.objects.get(
        country_name=request.data['origin_country'])
    temp.airline_company = AirlineCompany.objects.get(
        airline_name=request.data['airline_company'])

    Dict_serving_updFlight = {
        "landing_time": temp.landing_time,
        "departure_time": temp.departure_time,
        "remaining_tickets": temp.remaining_tickets,
        "airline_company": str(temp.airline_company),
        'id': id,
        "destination_country": str(temp.destination_country),
        "origin_country": str(temp.origin_country)}
    temp.save()
    return JsonResponse(Dict_serving_updFlight)


#       TICKET


#  get tickets for customer/user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTicketForCustomer(request):
    user = request.user
    customer=CustomerProfile.objects.get(user=user)
    tickets = Ticket.objects.filter(customer=customer)
    # print(tickets)
    flightsoftickets=[]
    for ticket in tickets:
        ticketflight= Flight.objects.get(_id=ticket.flight_id)
        flightserializer = FlightSerializer(ticketflight)
        # print(flightserializer.data)
        flightsoftickets.append(flightserializer.data)
        print(flightsoftickets)
    serializer = TicketSerializer(tickets,many=True)
    # print(serializer.data)
    return JsonResponse({"ticketseri":serializer.data , "flightseri":flightsoftickets})

   #  get single flight


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


# add ticket to customer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTicketForProfile(request):
    user = request.user
    # print(user.customerprofile_set.all().count)
    Ticket.objects.create(
        customer=CustomerProfile.objects.get(user=user),
        flight=Flight.objects.get(_id=request.data['flight_id'])
    )
    return JsonResponse({"user": user.username, "flight": request.data['flight_id']})

    # if (user.customerprofile_set.all().count):  # returns empty array, how to check if array not empty?


#  Delete Ticket
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTicket(request, id):
    print(id)
    Ticket.delete(Ticket.objects.get(_id=id))
    return Response({"Ticket deleted": id})


#       COUNTRY

#   get all country info
@api_view(['GET'])
def getAllCountrysInfo(request):
    countrys = Country.objects.all()
    serializer = CountrySerializer(countrys, many=True)
    return Response(serializer.data)



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
