import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

// const allTickers = [
//     { ticker: 'TSM', price: 45 },
//     { ticker: 'NOK', price: 4 },    
// ]

const allTickers = ['TSM', 'NOK'];

export default function Home() {
    // I'm assuming React.useState() will accept initial value for the state "value" and creates a function called setValue, which will 
    // Change the 'state' of value (which is tied to the Autocomplete tag) to the value passed to it.
    const [value, setValue] = React.useState(allTickers[0]);

    return (
        <div>
            <h1>Homepage</h1>
            {/* Have to use {``} to write in javascript and display in HTML */}
            {/* If value is not null, display value, otherwise null */}
            <div>{`value: ${value !== null ? `${value}` : 'null'}`}</div>
            <br />
            <Autocomplete 
                id='search-tickers'
                value = {value}
                onChange = {(event, newValue) => {
                    setValue(newValue);
                }}
                // options={allTickers.map((stock) => stock.ticker)}
                options={allTickers}
                renderInput={(params) => (
                    <TextField {...params} label='Search Tickers' margin='normal' variant='outlined' />
                    )}
                style={{ width: 300 }}
                />
        </div>
    );
}


