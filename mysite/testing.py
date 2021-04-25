import pandas as pd
from requests import get
from bs4 import BeautifulSoup
import re

pd.options.display.max_rows = 10000

def _find_match(pattern, text):
    match = pattern.search(text)
    return match

def get_nasdaq(as_list=True): # Nasdaq + NYSE + AMEX
    dfs = []
    for letter in 'abcdefghijklmnopqrstuvwxyz':
        request = get(f'https://www.advfn.com/nasdaq/nasdaq.asp?companies={letter.upper()}')
        soup = BeautifulSoup(request.text, 'lxml')
        table = soup.find('table', {'class': 'market tab1'})
        df = pd.read_html(str(table))[0]
        df.columns = df.iloc[1].tolist()
        df = df.iloc[2:]
        df = df.reset_index()
        df = df['Symbol']
        dfs.append(df)
  
	# Will this work since they are series?
    df = pd.concat(dfs)
    df = df.reset_index()
    df = df['Symbol']
    if as_list:
        return df.tolist()
    return df

def r_and_d(ticker):
    request = get(f'https://ycharts.com/companies/{ticker}/r_and_d_expense')
    soup = BeautifulSoup(request.text, 'lxml')
    tables = soup.find_all('table', {'class': 'histDataTable'})
    _pattern = re.compile(r'\d{1,3}\.\d{2}M')
    for table in tables:
        keys = [key.get_text() for key in table.find_all('td', {'class': 'col1'})]
        vals = [_find_match(_pattern, val.get_text()).group() for val in table.find_all('td', {'class': 'col2'})]
        data_dict = {key : val for key, val in zip(keys, vals)}
        print(data_dict)
        
        
r_and_d('NIO')        