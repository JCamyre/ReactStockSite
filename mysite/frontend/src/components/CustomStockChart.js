import React, { useState } from 'react';
import CandleStickChartWithHoverTooltip from './Chart';
import { TypeChooser } from 'react-stockcharts/lib/helper';

// All props accessed through data['name_of_prop']. data is whatever the first prop for the component is.
export default function ChartComponent (data, dates) {
    if (data['data'].length == 0) {
        return <div>Loading</div>
    }

    return (
        <TypeChooser>
                {(type) => <CandleStickChartWithHoverTooltip type={type} data={data['data']} />}
        </TypeChooser>
    )
}