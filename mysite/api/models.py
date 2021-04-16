from django.db.models import CASCADE, CharField, ForeignKey, Model, DateTimeField, SlugField
from django_mysql.models import ListCharField
# from django.contrib.auth.models import User
from django.utils import timezone
from django.urls import reverse
import py_trading as py_trd
from py_trading.download_tickers import get_nasdaq, get_nyse

# Create your models here.
class Portfolio(Model):

    portfolio_name = CharField(max_length=100)
    stocks = ListCharField(
        base_field = CharField(max_length=6),
        size=50,
        max_length = (50 * 11)
    )
    date_posted = DateTimeField(default=timezone.now)
    # author = ForeignKey(User, on_delete=CASCADE)

    def __str__(self):
        return f'{self.portfolio_name} ({len(self.stocks)} Symbols)'

    def get_absolute_url(self):
        # go back to the urls.py, look for 'portfolio-detail', pass in the 'pk' to get the specific url with self.pk
        return reverse('portfolio-detail', kwargs={'pk': self.pk})

class Stock(Model):
    # Stores all information for a stock (including the due diligence)
	# Change to only ticker Charfield, then in the views search results do all the functions?
    ticker = CharField(max_length=5)
    slug = SlugField(max_length=5, default=ticker)

    # def due_diligence(self): # Is this better than a variable named due_diligence = lambda _: stock_obj.due_diligence()
    #     stock_obj = py_trd.Stock(self.ticker)
    #     return stock_obj.due_diligence()
    
    # due_diligence = due_diligence

    def __str__(self):
        return self.ticker

# Methods
def add_stocks(): # Only run if you need to reset the Stock objects
    for ticker in get_nasdaq():
    	Stock.objects.create(ticker=ticker, slug=ticker)

    for ticker in get_nyse():
        Stock.objects.create(ticker=ticker, slug=ticker)

# Only run once to load all Stock objects.
# add_stocks()

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