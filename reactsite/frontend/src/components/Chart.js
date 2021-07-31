import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

// https://jsfiddle.net/TradingView/537kjtfg/

export default function Chart(props) {
  // Maybe five different div's because this Chart is ran five times during rendering, so five divvs
    useEffect(() => {
      if (props.data.length > 1) {
        const data = [{
          close: 79.93115804663,
          high: 81.1073314140418,
          low: 71.1792197675323,
          open: 75.40992523302856,
          time: {
            day: 1,
            month: 1,
            year: 2018
          }
        }, {
          close: 85.83485380506657,
          high: 85.83485380506657,
          low: 66.70379042371442,
          open: 73.1473266397836,
          time: {
            day: 2,
            month: 1,
            year: 2018
          }
        }];

        console.log(props.data);
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
      }
    })

    return (
      <div 
        id='chart'
      />
    )
    // return (
    //   <div>
    //     <Chart (made for HTML)
    //       symbol={props.ticker}
    //     />
    //   </div>
    // )
    
    // Try using dummy data and see if that fixes.
    // Try as much from sample code as possible.
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
