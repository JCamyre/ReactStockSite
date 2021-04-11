from django.urls import path 
from .views import index 

# app_name = 'frontend'

urlpatterns = [
    path('', index),
    path('create', index),
    path('stock/<str:ticker>', index), # Maybe change back to 'stock/<str:slug>'
    path('portfolio/<int:pk>', index),
]