import React from 'react';
import TradingViewWidget from 'react-tradingview-widget';

// https://github.com/rafaelklaessen/react-tradingview-widget

// const StockChart = () => {
function StockChart(props) {
  return (
    <TradingViewWidget 
      symbol='NASDAQ:AAPL'
      // theme={Themes.DARK}
    />
  );
};

export default StockChart

