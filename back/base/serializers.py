from rest_framework.serializers import ModelSerializer
from base.models import AirlineCompany, Country, CustomerProfile, Flight, Ticket
from django.contrib.auth.models import User

   
def aircompanyIdToNameSerializer(eachUser):
       return {
           
            "user":{
                "userName":eachUser.username,
                "isStaff":eachUser.is_staff},
            "customerprofile":{
                "address":eachUser.customerprofile.address,
                "email":eachUser.email}}
   
   
        
def UsersSerSerializer(eachUser):
       return {
            "user":{
                "userName":eachUser.username,
                "isStaff":eachUser.is_staff},
            "customerprofile":{
                "address":eachUser.customerprofile.address,
                "email":eachUser.email}}


class UserInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AirlineSerializer(ModelSerializer):
    class Meta:
        model = AirlineCompany
        fields = '__all__'


class CustomerProfileSerializer(ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'

class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
        
        
class TicketSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        
        
class FlightSerializer(ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'
