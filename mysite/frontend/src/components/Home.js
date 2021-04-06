import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Grid, Button, Typography, IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';


// const allTickers = [
//     { ticker: 'TSM', price: 45 },
//     { ticker: 'NOK', price: 4 },    
// ]

const allTickers = ['TSM', 'NOK'];

export default function Home() {
    // I'm assuming React.useState() will accept initial value for the state "value" and creates a function called setValue, which will 
    // Change the 'state' of value (which is tied to the Autocomplete tag) to the value passed to it.

    // Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class, so convenient!
    // "The useState Hook. A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components.
    const [value, setValue] = React.useState(allTickers[0]);
    // useState returns two values, the initial value of the state, and the function for updating the state variable

    const [error, setError] = React.useState('');

    const history = useHistory();

    return (
        <div>
            <h1>Homepage</h1>
            {/* Have to use {``} to write in javascript and display in HTML */}
            {/* If value is not null, display value, otherwise null */}
            <div>{`value: ${value !== null ? `${value}` : 'null'}`}</div>
            <br />
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
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
                </Grid>
                <Grid item xs={12} align='center'>
                    {/* How to increase size of button? */}
                    <Button color='primary' variant='contained' to='/create' component={ Link } 
                    onClick={() => {
                        stockButtonPressed(value, history, setError)
                    }}>
                        Information （{value})
                    </Button>
                </Grid>
            </Grid>        
        </div>
    );
}
// Handle routing with react-router. We want to route to the localhost:8000/api/view-stock to GET the stock information we need to display localhost:8000/stock/TSM
// onPush, can I pass in {value} myself? Or have to access somehow.
function stockButtonPressed(ticker, history, setError) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            // will change to stock.ticker (since I want stocks to be dictionary)
            // I think this is where the localhost:8000/stock?code=ticker takes place
            code: ticker,
        }),
    };
    // The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. 
    // It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.
        fetch("/api/find-stock/", requestOptions) // Getting 403 error
        .then((response) => {
            if (response.ok) {
                // history.push pushes a new entry into the history stack, basically redirecting the user to a new route/path (redirects them to localhost:8000/stock/TSM)
                history.push(`/stock/${value}`);
            } else {
                setError('Stock not found.');
            }
        }).catch((error) => {
            console.log(error);
            console.log('Bruh what happened');
        });
}

