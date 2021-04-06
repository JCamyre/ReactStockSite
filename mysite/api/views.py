from django.shortcuts import render
from rest_framework import generics, status
from .serializers import StockSerializer, PortfolioSerializer, CreatePortfolioSerializer
from .models import Portfolio, Stock
from rest_framework.views import APIView
from rest_framework.response import Response

# So the frontend.views handles the rendering of the index.html, which contains code for reactjs. 
# Then api.views handles the backend/logic of the webpages. Specific views handles specific urls. 

class PortfolioView(generics.ListAPIView):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

class CreatePortfolioView(APIView):
    serializer_class = CreatePortfolioSerializer

    def post(self, request, format=None): # Post request from the user when creating a new portfolio. View processing their information.

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            stocks = serializer.data.get('stocks')
            
            portfolio = Portfolio(stocks=stocks)
            portfolio.save()
            return Response(PortfolioSerializer(portfolio).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class UpdatePortfolioView(APIView):
    pass 

class StockView(generics.ListAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    
    # get_queryset modifies what objects to be returned for the view.
    # Idea for sending python data to javascript for the <Autocomplete />. 
    # json_data = serializer_class(queryset). Idk how to pass context since api.views only for accessing information from database. 

class FindStock(APIView):
    lookup_url_kwarg = 'ticker'

    def post(self, request, format=None):
        # Get the value of ticker (lookup_url_kwarg) from the POST request from the user. 
        ticker = request.data.get(self.lookup_url_kwarg)

        if ticker != None:
            stock_result = Stock.objects.filter(ticker=ticker)
            if len(stock_result) > 0: # If the stock exists
                stock = stock_result[0]
                # Not sure the significance or how I access the 'stock_ticker' variable from a session of the website
                self.request.session['stock_ticker'] = ticker 
                return Response({'message': 'You are viewing the stock!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'This stock does not exist or is not part of our database, sorry!'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a ticker'}, status=status.HTTP_400_BAD_REQUEST)
        


