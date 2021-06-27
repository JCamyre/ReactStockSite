from django.shortcuts import render
from rest_framework import generics, status
from .serializers import StockSerializer, PortfolioSerializer, CreatePortfolioSerializer
from .models import Portfolio, Stock
from .methods import add_stocks
from rest_framework.views import APIView
from rest_framework.response import Response
import py_trading
import datetime


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
                    current_stock = py_trading.Stock(current_stock)                
                except:
                    return Response({'Stock not found': 'Not supported exchange.'}, status=status.HTTP_404_NOT_FOUND)        
                # If I have to generate all of this information everytime someone clicks on a stock, what's the point of having a database for these stocks? All I need is the GetAllStocks view for homepages and get the ticker string, and use py_trading.Stock(ticker)
                # IDK, SOMETIMES RANDOMLY DOESN'T WORK... SOMETHING IN THIS TRY STATEMENT IS FAILING.

                due_diligence_data = current_stock.financials() # Should I convert to dictionary?
                # print(ticker, due_diligence_data[0][['Label', 'Value']], due_diligence_data[1], due_diligence_data[2])
                # print(due_diligence_data[0])
                # I'M PRETTY SURE THE LABEL AND VALUE IN THE DF CHANGE SOMETIMES, IDK WHY
                
                # Really janky fix for now, seemingly .financials() labels and values r random (sometimes swapped, sometimes not)

                data_dict = {key : val for key, val in due_diligence_data.values.tolist()}
                try:
                    data['data2'] = data_dict['Insider Own'], data_dict['Shs Float'], data_dict['RSI (14)']
                except:
                    data_dict = {key : val for key, val in zip(due_diligence_data[0]['Value'], due_diligence_data[0]['Label'])}
                    data['data2'] = data_dict['Insider Own'], data_dict['Shs Float'], data_dict['RSI (14)']
                    
                data['data1'] = data_dict
                data['data3'] = data_dict['Volatility'], data_dict['Rel Volume'], data_dict['Volume']    

                # dates = [date.timestamp() for date in current_stock.get_month_data().index]
                ohlc = current_stock.get_month_data(n=24)[['Open', 'High', 'Low', 'Close', 'Volume']]

                # [date.to_numpy() for date in ohlc.index]
                ohlc_data = [{'date': date, 'open': data[0], 'high': data[1], 'low': data[2], 'close': data[3], 'volume': data[4]} for date, data in zip(ohlc.index, ohlc.values.tolist())]
                print(ohlc_data)

                data['seriesData'] = ohlc_data
                
                
                # print(current_stock.get_month_data().tolist())
                # data['news'] = current_stock.news_sentiments()
                # data['short_selling'] = current_stock.short_selling()
                # data['put_call_ratio'] = current_stock.put_call_ratio()
                # data['social_media'] = current_stock.social_media_sentiment()
                # data['big_money'] = current_stock.big_money()
                
                print(data)            
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
        
class GetSearchedStock(APIView):
        
    def get(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()
        # add_stocks()
        ticker = request.GET['queried_ticker']
        queried_stocks = Stock.objects.filter(ticker__startswith=ticker)
        queried_stocks = [{'ticker': StockSerializer(stock).data['ticker']} for stock in queried_stocks]
        data = {}
        data['queried_ticker'] = queried_stocks
        print(data)

        return Response(data, status=status.HTTP_200_OK)


