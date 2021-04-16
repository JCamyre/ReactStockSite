import pandas as pd
from requests import get
from bs4 import BeautifulSoup

pd.options.display.max_rows = 10000

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

print(get_nasdaq().tolist())

