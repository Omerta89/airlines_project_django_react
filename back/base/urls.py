from django.urls import path
from base.models import AirlineCompany
from .views import admin_views
from .views.admin_views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (TokenRefreshView,)


urlpatterns = [
    path('', admin_views.getRoutes),
    # User
    path('getuserinfo/', admin_views.getUserInfo),
    path('getallusers/', admin_views.getAllUsers),
    # Airline
    path('getallairlines/', admin_views.getAllAirlinesInfo),
    path('airline/', admin_views.getAirlines, name='airline'),
    path('addairlineforuser/', admin_views.addAirlineForUSER),
    # Profile
    path('getallprofiles/', admin_views.getAllProfilesInfo),
    path('cusprofile/', admin_views.getCustomerProfile),
    path('addprofile/', admin_views.addProfile, name='profile'),
    path('updcusprofile/<int:id>', admin_views.updCustomerProfile),
    # Country
    path('getallcountrys/', admin_views.getAllCountrysInfo),
    path('addcountry/', admin_views.addCountry),
    # Flight
    path('addflight/', admin_views.addFlight),
    path('deleteflight/<int:id>', admin_views.deleteFlight),
    path('updflight/<int:id>', admin_views.updFlight),
    path('getallflights/', admin_views.getAllFlightsInfo),
    # Ticket
    path('addticket/', admin_views.addTicketForProfile),
    path('getalltickets/', admin_views.getAllTicketsInfo),
    path('getcusticket/', admin_views.getTicketForCustomer),
    path('deleteticket/<int:id>', admin_views.deleteTicket),

    # auth-register
    path('adduser/', admin_views.addUser),
    # auth-login
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
