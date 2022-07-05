from django.contrib import admin
from .models import Country,Airline,Flight,CustomerProfile,Ticket
 
admin.site.register(Country)
admin.site.register(Airline)
admin.site.register(Flight)
admin.site.register(CustomerProfile)
admin.site.register(Ticket)
