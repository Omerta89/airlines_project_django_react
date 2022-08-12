from django.urls import path

from base.models import AirlineCompany
from .views import admin_views
from .views.admin_views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (TokenRefreshView,)
 
 
urlpatterns = [
    path('', admin_views.getRoutes),
    path('airline/', admin_views.getAirlines, name='airline'),
    path('cusprofile/', admin_views.getCustomerProfile),
    path('addprofile/', admin_views.addProfile,name='profile'),
    path('getuserinfo/', admin_views.getUserInfo),
    path('addairlineforuser/', admin_views.addAirlineForUSER),
    path('getallusers/', admin_views.getAllUsers),
    path('getallairlines/', admin_views.getAllAirlinesInfo),
    path('getallprofiles/', admin_views.getAllProfilesInfo),
    path('getallcountrys/', admin_views.getAllCountrysInfo),
    path('getallflights/', admin_views.getAllFlightsInfo),
    path('getalltickets/', admin_views.getAllTicketsInfo),
    path('addcountry/', admin_views.addCountry),
    path('addflight/', admin_views.addFlight),
    path('addticket/', admin_views.addTicketForProfile),
    path('deleteflight/<int:id>', admin_views.deleteFlight),
    path('updflight/<int:id>', admin_views.updFlight),
    path('companyidtoname/', admin_views.convertAircompanyIDtoName),
    
    
    
    # auth-register
    path('adduser/', admin_views.addUser),
    # auth-login 
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


