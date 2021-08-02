import React from 'react';
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';

// https://github.com/rafaelklaessen/react-tradingview-widget

// const StockChart = () => {
function StockChart(props) {

  return (
    <div>
      <TradingViewWidget 
        // symbol='NASDAQ:AAPL'
        symbol={`${props.ticker}`}
        theme={Themes.DARK}
        width='1350px'
        height='700px'
        // barstyle={BarStyles.HEIKIN_ASHI}
      />
    </div>
  );
};

export default StockChart

