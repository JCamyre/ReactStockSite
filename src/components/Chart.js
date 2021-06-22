import React from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();

export default function FinancialChartMultipleData(props) {

    return (
        <div className="container sample" style={{height: "100%"}}>
            <div className="container">
            <IgrFinancialChart
                width="100%"
                height="600px"
                chartType="Candle"
                thickness={2}
                chartTitle={props.ticker}
                // subtitle="Between 2013 and 2017"
                yAxisMode="PercentChange"
                yAxisTitle="Percent Changed"
                dataSource={props.data} />
            </div>
        </div>       
    )
}
