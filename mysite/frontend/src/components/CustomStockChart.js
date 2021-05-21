import React, { useState } from 'react';
import Chart from './Chart';
import { TypeChooser } from 'react-stockcharts/lib/helper';

export default function ChartComponent (data) {
    if (data['data'].length == 0) {
        return <div>Loading</div>
    }
    console.log('yo');
    console.log(data['data'] == Array(), data['data'].length, Array());
    return (
        <TypeChooser>
                {(type) => <Chart type={type} data={data['data']} />}
        </TypeChooser>
    )
}