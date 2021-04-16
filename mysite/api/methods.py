from .models import Stock, Portfolio
import py_trading
from py_trading.download_tickers import get_nasdaq, get_nyse


def add_stocks(): # Only run if you need to reset the Stock objects
    unique_stocks = set()
    for ticker in get_nasdaq():
    	unique_stocks.add(ticker)

    for ticker in get_nyse():
        unique_stocks.add(ticker)
        
    for ticker in unique_stocks:
        Stock.objects.create(ticker=ticker, slug=ticker)

# Only run once to load all Stock objects.

def reset_stocks():
    Stock.objects.all().delete()
    add_stocks()
    
def delete_duplicate_stocks():
    all_stocks = Stock.objects.all()
    unique_tickers = set([stock.ticker for stock in all_stocks])
    for stock in list(unique_tickers):
        duplicates = Stock.objects.filter(ticker=stock)
        if duplicates.count() > 1:
            [duplicate.delete() for duplicate in duplicates[1:]]