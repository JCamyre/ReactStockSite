from django.shortcuts import render
from rest_framework import generics, status
from .serializers import StockSerializer, PortfolioSerializer, CreatePortfolioSerializer
from .models import Portfolio, Stock
from .methods import add_stocks, delete_duplicate_stocks, test_stocks
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
    
    
class GetStockInfo(APIView):
    serializer_class = StockSerializer
      
    def get(self, request, format=None):
        ticker = request.GET['ticker'].upper()
        
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
                ohlc_data = [{'time': date, 'open': data[0], 'high': data[1], 'low': data[2], 'close': data[3], 'volume': data[4]} for date, data in zip(ohlc.index, ohlc.values.tolist())]

                data['seriesData'] = ohlc_data
                print(data)
                
                
                # print(current_stock.get_month_data().tolist())
                # data['news'] = current_stock.news_sentiments()
                # data['short_selling'] = current_stock.short_selling()
                # data['put_call_ratio'] = current_stock.put_call_ratio()
                # data['social_media'] = current_stock.social_media_sentiment()
                # data['big_money'] = current_stock.big_money()
                
                return Response(data, status=status.HTTP_200_OK)
                
            return Response({'Stock not found': 'Invalid Ticker.'}, status=status.HTTP_404_NOT_FOUND)
                
class StockTechnicals(APIView):
    def get(self, request, format=None):
        ticker = request.GET['queried_ticker']
        
        if ticker != None:
            stock_result = Stock.objects.filter(ticker=ticker)
            if len(stock_result) > 0:
                stock = stock_result[0]
                
                try: 
                    stock = py_trading.Stock(stock.ticker)
                except:
                    return Response({'Stock not supported by exchange': 'Not supported exchange.'}, status=status.HTTP_404_NOT_FOUND)        

                data = {}
                data['techincals'] = stock.ta_indictators()
                data['activity'] = stock.big_money()
                data['short-selling'] = stock.short_selling()
                
                return Response(data, status=status.HTTP_200_OK)         
                
        return Response({'Bad Request': 'This stock does not exist or is not part of our database, sorry!'})       
     
class StockNews(APIView): # Do it so news is related to sector, not just ticker.
    
    def get(self, request, format=None):
        ticker = request.GET['ticker']
        print(ticker)
        
        if ticker != None:
            stock_result = Stock.objects.filter(ticker=ticker)
            if len(stock_result) > 0:
                stock = stock_result[0]
                
                try: 
                    stock = py_trading.Stock(stock.ticker)
                except:
                    return Response({'Stock not supported by exchange': 'Not supported exchange.'}, status=status.HTTP_404_NOT_FOUND)  
                
                data = {}
                data['news-sentiment'] = stock.news_sentiments()                
                data['social-media'] = stock.social_media()
                
                return Response(data, status=status.HTTP_200_OK)
            
        return Response({'Bad Request': 'This stock does not exist or is not part of our database, sorry!'})       


class FindStock(APIView):
    lookup_url_kwarg = 'ticker'
        
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        ticker = request.data.get(self.lookup_url_kwarg)
       
        if ticker != None:
            stock_result = Stock.objects.filter(ticker=ticker)
            if len(stock_result) > 0: # If the stock exists
                stock = stock_result[0]

                self.request.session['ticker'] = stock.ticker
                return Response({'message': 'You are viewing the stock!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'This stock does not exist or is not part of our database, sorry!'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Invalid post data, did not find a ticker'}, status=status.HTTP_400_BAD_REQUEST)
        
class GetSearchedStock(APIView):
        
    def get(self, request, format=None):
        ticker = request.GET['queried_ticker']
        queried_stocks = Stock.objects.filter(ticker__startswith=ticker)
        queried_stocks = [{'ticker': StockSerializer(stock).data['ticker'], 'name': StockSerializer(stock).data['name']} for stock in queried_stocks]
        data = {}
        data['queried_ticker'] = sorted(queried_stocks, key=lambda x: x['ticker'])

        return Response(data, status=status.HTTP_200_OK)


