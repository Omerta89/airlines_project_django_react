from django.urls import path

from base.models import Airline
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (TokenRefreshView,)
 
 
urlpatterns = [
    path('', views.getRoutes),
    path('airline/', views.getAirlines, name='airline'),
    path('cusprofile/', views.getCustomerProfile),
    path('addprofile/', views.addProfile,name='profile'),

    
    # auth-register
    path('adduser/', views.addUser),
    # auth-login 
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
