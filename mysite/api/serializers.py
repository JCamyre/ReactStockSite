from rest_framework import serializers
from .models import Portfolio, Stock 

class PortfolioSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Portfolio 
        fields = '__all__'

class CreatePortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('stocks')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'
