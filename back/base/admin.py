from django.contrib import admin
from .models import Country,AirlineCompany,Flight,CustomerProfile,Ticket
 
admin.site.register(Country)
admin.site.register(AirlineCompany)
admin.site.register(Flight)
admin.site.register(CustomerProfile)
admin.site.register(Ticket)
