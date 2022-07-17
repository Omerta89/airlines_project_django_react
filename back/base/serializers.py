from rest_framework.serializers import ModelSerializer
from base.models import AirlineCompany, CustomerProfile
from django.contrib.auth.models import User

        
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
        fields = ['phone_num']
