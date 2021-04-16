from django.urls import path 
from .views import PortfolioView, CreatePortfolioView, UpdatePortfolioView, StockView, FindStock, GetStock


# The frontend will access these urls and views (which has the logic for POST and GET requests for portfolio/stock objects) which will then be 
# displayed in frontend/index.html utilizing React JS Components

urlpatterns = [
    path('portfolio', PortfolioView.as_view()),
    path('stock', StockView.as_view()), # Confused what to use StockView for. 
    path('find-stock', FindStock.as_view()),
    path('update-portfolio', UpdatePortfolioView.as_view()),
    path('get-stock', GetStock.as_view()),
]