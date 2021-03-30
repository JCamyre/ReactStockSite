from django.urls import path 
from .views import 


# The frontend will access these urls and views from api which will then be displayed in frontend/index.html

urlpatterns = [
    path('portfolio'),
    path('stock'),
    path('update-portfolio'),
]