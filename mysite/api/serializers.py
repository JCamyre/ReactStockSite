from rest_framework import serializers
from .models import Portfolio, Stock 

# Python object -> JSON object
class PortfolioSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Portfolio 
        fields = '__all__'

# JSON object -> Python object
class CreatePortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('stocks')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'
