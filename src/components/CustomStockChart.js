import React, { useState } from 'react';
import CandleStickChartWithHoverTooltip from './Chart';

// All props accessed through data['name_of_prop']. data is whatever the first prop for the component is.
export default function ChartComponent (data, dates) {
    if (data['data'].length == 0) {
        return <div className='center'>Loading</div>
    }

    return (
            <CandleStickChartWithHoverTooltip data={data['data']} />
    )
}