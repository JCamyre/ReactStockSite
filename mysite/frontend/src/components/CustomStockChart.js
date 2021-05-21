import React, { useState } from 'react';
import Chart from './Chart';
import { TypeChooser } from 'react-stockcharts/lib/helper';

export default function ChartComponent (data) {
    if (data['data'].length == 0) {
        return <div>Loading</div>
    }

    console.log(typeof data['data'][0]['date']);

    return (
        <TypeChooser>
                {(type) => <Chart type={type} data={data['data']} />}
        </TypeChooser>
    )
}