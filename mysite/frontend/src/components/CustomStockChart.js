import React, { useState } from 'react';
import Chart from './Chart';
import { TypeChooser } from 'react-stockcharts/lib/helper';

export default function ChartComponent (data) {
    if (data['data'] == null) {
        return <div>Loading</div>
    }
    
    return (
        <TypeChooser>
                {(type) => <Chart type={type} data={data} />}
        </TypeChooser>
    )
}