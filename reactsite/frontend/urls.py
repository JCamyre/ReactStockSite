from django.urls import path 
from .views import index 

# app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('create', index),
    path('stock/<str:ticker>', index),
    path('portfolio/<int:pk>', index),
    path('testing', index)
]