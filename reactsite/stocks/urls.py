from django.urls import path 
from .views import PortfolioView, CreatePortfolioView, UpdatePortfolioView, StockView, FindStock, GetStockInfo, GetSearchedStock, StockTechnicals, StockNews


# The frontend will access these urls and views (which has the logic for POST and GET requests for portfolio/stock objects) which will then be 
# displayed in frontend/index.html utilizing React JS Components

urlpatterns = [
    path('portfolio', PortfolioView.as_view()),
    path('stock', StockView.as_view()), # StockView is for localhost:8000/stock/TSM (actual page for viewing a Stock's information), which is Home.js Autocomplete Tag (localhost:8000/api/ticker?=TSM))
    path('find-stock', FindStock.as_view()),
    path('update-portfolio', UpdatePortfolioView.as_view()),
    path('get-stock', GetStockInfo.as_view()),
    path('get-searched-stock', GetSearchedStock.as_view()),
    path('get-technicals', StockTechnicals.as_view()),
    path('get-news', StockNews.as_view())
]