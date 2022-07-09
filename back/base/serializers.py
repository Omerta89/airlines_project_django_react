from rest_framework.serializers import ModelSerializer
from base.models import Airline,CustomerProfile
 
 
class AirlineSerializer(ModelSerializer):
    class Meta:
        model = Airline
        fields = '__all__'


class CustomerProfileSerializer(ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'
