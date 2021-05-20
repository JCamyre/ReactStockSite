import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';


export default function CustomApexChart (seriesData) {

    // seriesData = [Candlestock OHLC data]
    // Not going to use useState since not changing any of this stuff
    seriesData = seriesData['seriesData'];

    // seriesDataLinear is for the Bar chart.
    const seriesDataLinear = [];

    // Anyway to delete empty space (for the weekend)?

    // Info box not working

    const all_options = {
          
        series: [{
          data: seriesData
        }],
        options: {
          chart: {
            type: 'candlestick',
            height: 290,
            id: 'candles',
            toolbar: {
              autoSelected: 'pan',
              show: false
            },
            zoom: {
              enabled: false
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#3C90EB',
                downward: '#DF7D46'
              }
            }
          },
          xaxis: {
            type: 'datetime'
          }
        },
      
        seriesBar: [{
          name: 'volume',
          data: seriesDataLinear
        }],
        optionsBar: {
          chart: {
            height: 160,
            type: 'bar',
            brush: {
              enabled: true,
              target: 'candles'
            },
            selection: {
              enabled: true,
              xaxis: {
                min: new Date('20 Jan 2017').getTime(),
                max: new Date('10 Dec 2017').getTime()
              },
              fill: {
                color: '#ccc',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
              }
            },
          },
          dataLabels: {
            enabled: true
          },
          plotOptions: {
            bar: {
              columnWidth: '80%',
              colors: {
                ranges: [{
                  from: -1000,
                  to: 0,
                  color: '#F15B46'
                }, {
                  from: 1,
                  to: 10000,
                  color: '#FEB019'
                }],
          
              },
            }
          },
          stroke: {
            width: 0
          },
          xaxis: {
            type: 'datetime',
            axisBorder: {
              offsetX: 13
            }
          },
          yaxis: {
            labels: {
              show: false
            }
          }
        },
      
      
      };
    
    return (
        <div class='chart-box'>
            <div id='chart-candlestick'>
                <ReactApexChart color='black' options={all_options.options} series={all_options.series} type='candlestick' height={290} />
            </div>
            {/* <div id='chart-bar'>
                <ReactApexChart options={all_options.optionsBar} series={all_options.seriesBar} type='bar' height={160} />
            </div> */}
        </div>
    )

}