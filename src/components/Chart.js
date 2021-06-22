import React from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';

IgrFinancialChartModule.register();

export default function FinancialChartMultipleData(props) {

    return (
        <div className="container sample" >
            <div className="container" style={{height: "calc(100% - 25px)"}}>
            <IgrFinancialChart
                width="100%"
                height="100%"
                chartType="Line"
                thickness={2}
                chartTitle="Google vs Microsoft Changes"
                subtitle="Between 2013 and 2017"
                yAxisMode="PercentChange"
                yAxisTitle="Percent Changed"
                dataSource={props.data} />
            </div>
        </div>       
    )
}
