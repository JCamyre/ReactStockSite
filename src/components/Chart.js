import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

// https://jsfiddle.net/TradingView/537kjtfg/

export default function Chart(props) {
  // Maybe five different div's because this Chart is ran five times during rendering, so five divvs
    useEffect(() => {
      const chart = createChart('chart', { width: 400, height: 300 });
      // const barSeries = addBarSeries({})
      var candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(props.data);
  
      var smaData = calculateSMA(props.data, 10);
      var smaLine = chart.addLineSeries({
          color: 'rgba(4, 111, 232, 1)',
          lineWidth: 2,
      });
      smaLine.setData(smaData);
    })

    return (
      <div 
        id='chart'
      />
    )
}

function calculateSMA(data, count){
    var avg = function(data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
         sum += data[i].close;
      }
      return sum / data.length;
    };
    var result = [];
    for (var i=count - 1, len=data.length; i < len; i++){
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val});
    }
    return result;
  }

// import { IgrFinancialChart } from 'igniteui-react-charts';
// import { IgrFinancialChartModule } from 'igniteui-react-charts';

// IgrFinancialChartModule.register();

// export default function FinancialChartMultipleData(props) {

//     return (
//         <div className="container sample">
//             <div className="container">
//             <IgrFinancialChart
//                 width="60%"
//                 height="575px"
//                 chartType="Candle"
//                 thickness={1}
//                 chartTitle={props.ticker}
//                 // subtitle="Between 2013 and 2017"
//                 // yAxisMode="PercentChange"
//                 // yAxisTitle="Percent Changed"
//                 dataSource={props.data} />
//             </div>
//         </div>       
//     )
// }
