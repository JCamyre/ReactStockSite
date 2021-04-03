import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <Autocomplete 
                    id='search-tickers'
                    options={allTickers.map((stock) => stock.ticker)}
                    renderInput={(params) => (
                        <TextField {...params} label='Search Tickers' margin='normal' variant='outlined' />
                        )}
                    />
            </div>
        )
    }
}

const allTickers = [
    { ticker: 'TSM', price: 45 },
    { ticker: 'NOK', price: 4 },    
]
