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

    
    # auth-register
    path('adduser/', admin_views.addUser),
    # auth-login 
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
