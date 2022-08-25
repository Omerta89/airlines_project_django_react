from django.db import models
from django.contrib.auth.models import User


class Country(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    country_name = models.CharField(max_length=50, null=False, unique=True)
    def __str__(self):
         	return f" {self.country_name} "


class AirlineCompany(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # bigint
    _id = models.BigAutoField(primary_key=True, editable=False)
    airline_name = models.CharField(max_length=50, null=False, unique=True)
    country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True)  # int
    def __str__(self):
     	return f" {self.airline_name} "


class Flight(models.Model):
    _id = models.BigAutoField(primary_key=True, editable=False)
    departure_time = models.DateTimeField()
    landing_time = models.DateTimeField()
    remaining_tickets = models.IntegerField()
    airline_company = models.ForeignKey(
        AirlineCompany, on_delete=models.SET_NULL, null=True, related_name='airline_company')  # bigint
    destination_country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, related_name='arrival_country_id')  # int
    origin_country = models.ForeignKey(
        Country, on_delete=models.SET_NULL, null=True, related_name='origin_country_id')  # int
    def __str__(self):
     	return f" {self._id}"

class CustomerProfile(models.Model):
    user = models.OneToOneField(
            User, on_delete=models.CASCADE, primary_key=True)  # bigint
    address=models.CharField(max_length=50)
    phone_num=models.CharField(max_length=20,null=False,unique=True)
    credit_card=models.CharField(max_length=20, null=False,unique=True)
    def __str__(self):
         	return f" {self.user} "
      
class Ticket(models.Model):  
    _id=models.BigAutoField(primary_key=True,editable=False)
    customer=models.ForeignKey(CustomerProfile,on_delete=models.SET_NULL,null=True) #bigint
    flight=models.ForeignKey(Flight,on_delete=models.SET_NULL,null=True) #bigint
    class Meta:
        constraints = [models.UniqueConstraint(fields=['flight', 'customer'], name='unique_booking')]
    def __str__(self):
        return f" {self._id} "