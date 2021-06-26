from .models import Stock, Portfolio
import py_trading
from py_trading.download_tickers import get_nasdaq, get_nyse
import concurrent.futures


def add_stocks(): # Only run if you need to reset the Stock objects
    unique_stocks = set()
    for ticker in get_nasdaq():
    	unique_stocks.add(ticker)

    for ticker in get_nyse():
        unique_stocks.add(ticker)
        
    for ticker in unique_stocks:
        # NEED TO HAVE TICKER + COMPANY NAME FOR get_nasdaq() and get_nyse()
        # name=ticker.name
        Stock.objects.create(ticker=ticker, slug=ticker)

# Only run once to load all Stock objects.

def reset_stocks(n_threads):
    Stock.objects.all().delete()
    add_stocks()
    with concurrent.futures.ProcessPoolExecutor() as executor:
        results = [executor.submit(test_stocks, i, n_threads) for i in range(n_threads)] # Can try executor.map()
        
        for f in concurrent.futures.as_completed(results):
            print(f.result())
    
def test_stocks(index_of_thread, num_of_threads): # Divide # of stocks per thread / total stocks to be tested. Index_of_thread is which thread from 0 to n threads.
    n_stocks_per_thread = len(Stock.objects.all()) 
    portion = Stock.objects.all()[index_of_thread*n_stocks_per_thread:(index_of_thread+1)*n_stocks_per_thread]
    
    for stock in portion:
        try:
            print(stock.ticker)
        except:
            stock.delete()
            print(stock.ticker + ' is bad')
            
    
def delete_duplicate_stocks():
    all_stocks = Stock.objects.all()
    unique_tickers = set([stock.ticker for stock in all_stocks])
    for stock in list(unique_tickers):
        duplicates = Stock.objects.filter(ticker=stock)
        if duplicates.count() > 1:
            [duplicate.delete() for duplicate in duplicates[1:]]