from django.urls import path 
from .views import index 

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('create', index),
    path('stock/<str:slug>', index),
    path('portfolio/<int:pk>', index),
]