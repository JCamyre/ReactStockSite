from django.shortcuts import render
from rest_framework import generics, status
from .serializers import StockSerializer, PortfolioSerializer, CreatePortfolioSerializer
from .models import Portfolio, Stock
from .methods import reset_stocks
from rest_framework.views import APIView
from rest_framework.response import Response
import py_trading

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

class StockView(generics.ListAPIView): # A Specific stock's detailed info page with Due diligence
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
      
    # print(py_trading.Stock(Stock.objects.all().filter(ticker='TSM')[0].ticker).financials())
    
    
class GetStock(APIView):
    serializer_class = StockSerializer
    lookup_url_kwarg = 'ticker' # localhost:8000/api/get-stock?ticker=TSM
      
    def get(self, request, format=None):
        ticker = request.GET.get(self.lookup_url_kwarg)
        if ticker != None:
            stock = Stock.objects.filter(ticker=ticker)
            if len(stock) > 0:
                stock = stock[0]
                data = StockSerializer(stock).data
                data['ticker'] = stock.ticker # Idk how to access data likes this
                # Have to have attribute for Stock models for the due_diligence information
                try:
                    current_stock = Stock.objects.all().filter(ticker=stock.ticker)[0].ticker
                    due_diligence_data = py_trading.Stock(current_stock).financials() # Should I convert to dictionary?
                    # print(ticker, due_diligence_data[0][['Label', 'Value']], due_diligence_data[1], due_diligence_data[2])
                    print(due_diligence_data[0])
                    # I'M PRETTY SURE THE LABEL AND VALUE IN THE DF CHANGE SOMETIMES, IDK WHY
                    data_dict = {key : val for key, val in zip(due_diligence_data[0]['Label'], due_diligence_data[0]['Value'])} # Value and Label columns are swapped smh
                    data['data1'] = data_dict
                    # data['data1'] = dict(filter(lambda elem: elem[0] == 'Avg Volume' or elem[0] == 'Short Float', data['data1'].items()))
                    data['data2'] = data_dict['Insider Own'], data_dict['Shs Float'], data_dict['RSI (14)']
                    data['data3'] = data_dict['Volatility'], data_dict['Rel Volume'], data_dict['Volume']
                    data['news'] = current_stock.news_sentiments()
                    data['short_selling'] = current_stock.short_selling()
                    data['put_call_ratio'] = current_stock.put_call_ratio()
                    data['social_media'] = current_stock.social_media_sentiment()
                    data['big_money'] = current_stock.big_money()
                    
                    print(data)            
                except:
                    return Response({'Stock not found': 'Not supported exchange.'}, status=status.HTTP_404_NOT_FOUND)        
                    # Have different tables of information: General info, financials, stuff for trading (short float, average volume, etc)
                return Response(data, status=status.HTTP_200_OK)
                
            print('yo')
            return Response({'Stock not found': 'Invalid Ticker.'}, status=status.HTTP_404_NOT_FOUND)
                

class FindStock(APIView):
    # Since I have to convert serialize object to JSON to send it to React, have to automatically update every minute or so (Stock.update_stock)
    lookup_url_kwarg = 'ticker'
        
    def post(self, request, format=None):
        # Check to see if user already has an existing session key
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        # Get the value of ticker (lookup_url_kwarg) from the POST request from the user. 
        # THIS IS THE ISSUE
        ticker = request.data.get(self.lookup_url_kwarg)

        # print(self.lookup_url_kwarg, request.data, ticker, 'from api/views.py')
        
        print(ticker)

        if ticker != None:
            stock_result = Stock.objects.filter(ticker=ticker)
            if len(stock_result) > 0: # If the stock exists
                stock = stock_result[0]
                # Not sure the significance or how I access the 'stock_ticker' variable from a session of the website
                # I havew to make a session thing because self.requestion.session dictionary is how I "cache" information (such as what stock they are current looking for) for the current user on the website. 
                self.request.session['ticker'] = stock.ticker
                # Have to make due_diligence output JSON serializable. 
                # self.request.session['stock_dd'] = stock.due_diligence() 
                # Would have the session keep what stock you want to look at be best, or just write after you press search, get taken to /stock/TSMz
                return Response({'message': 'You are viewing the stock!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'This stock does not exist or is not part of our database, sorry!'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Invalid post data, did not find a ticker'}, status=status.HTTP_400_BAD_REQUEST)
        
class GetAllStocks(APIView):
         
    def get(self, request, format=None):
        all_stocks = Stock.objects.all()[:10]
        all_stocks = [StockSerializer(stock).data['ticker'] for stock in all_stocks]
        print(all_stocks)
        data = {}
        data['all_tickers'] = all_stocks
        # Serializer for all stock objects?
        return Response(data, status=status.HTTP_200_OK)
        # What condition should I return Response(status=status.HTTP_404_NOT_FOUND)


