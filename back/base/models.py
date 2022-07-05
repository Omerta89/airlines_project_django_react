from django.db import models
from django.contrib.auth.models import User



class Country(models.Model):  
    country_id=models.AutoField(primary_key=True,editable=False)
    country_name=models.CharField(max_length=50,null=False,unique=True)
    def __str__(self):
         	return self.country_name
class Airline(models.Model):   
    airline_id=models.BigAutoField(primary_key=True,editable=False)
    airline_name=models.CharField(max_length=50,null=False,unique=True)
    country_id=models.ForeignKey(Country,on_delete=models.SET_NULL,null=True) #int
    user_id=models.OneToOneField(User,on_delete=models.SET_NULL,null=True) #bigint
    def __str__(self):
     	return self.airline_id
class Flight(models.Model):   
    flight_id=models.BigAutoField(primary_key=True,editable=False)
    airline_id=models.ForeignKey(Airline,on_delete=models.SET_NULL,null=True) #bigint    
    origin_country_id=models.ForeignKey(Country,on_delete=models.SET_NULL,null=True) #int
    destination_country_id=models.ForeignKey(Country,on_delete=models.SET_NULL,null=True, related_name='arrival_country_id') #int
    departure_time=models.DateTimeField(auto_now_add=True)
    landing_time=models.DateTimeField(auto_now_add=True)
    remaining_tickets=models.IntegerField()
    def __str__(self):
     	return self.flight_id
class CustomerProfile(models.Model):  
    customer_id=models.BigAutoField(primary_key=True,editable=False)
    first_name=models.CharField(max_length=50,null=False)
    last_name=models.CharField(max_length=50,null=False)
    address=models.CharField(max_length=50)
    phone_num=models.CharField(max_length=50,null=False,unique=True)
    credit_card=models.CharField(max_length=50,null=False,unique=True)
    user_id=models.OneToOneField(User,on_delete=models.CASCADE,null=False) #bigint
    def __str__(self):
         	return self.first_name
class Ticket(models.Model):  
    ticket_id=models.BigAutoField(primary_key=True,editable=False)
    
    flight_id=models.ForeignKey(Flight,on_delete=models.SET_NULL,null=True) #bigint
    customer_id=models.ForeignKey(CustomerProfile,on_delete=models.SET_NULL,null=True) #bigint
    class Meta:
        constraints = [models.UniqueConstraint(fields=['flight_id', 'customer_id'], name='unique_booking')]

    def __str__(self):
        return self.ticket_id