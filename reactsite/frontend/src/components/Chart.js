import React from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();

export default function FinancialChartMultipleData(props) {

    return (
        <div className="container sample">
            <div className="container">
            <IgrFinancialChart
                width="60%"
                height="575px"
                chartType="Candle"
                thickness={1}
                chartTitle={props.ticker}
                // subtitle="Between 2013 and 2017"
                // yAxisMode="PercentChange"
                // yAxisTitle="Percent Changed"
                dataSource={props.data} />
            </div>
        </div>       
    )
}
