from django.urls import path 
from .views import PortfolioView, CreatePortfolioView, UpdatePortfolioView, StockView


# The frontend will access these urls and views (which has the logic for POST and GET requests for portfolio/stock objects) which will then be 
# displayed in frontend/index.html utilizing React JS Components

urlpatterns = [
    path('portfolio'),
    path('stock'),
    path('update-portfolio'),
]