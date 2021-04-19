import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function Stock(props) {
    // props argument is accepting the /stock/:ticker argument, which is from the value in Home.js/stockButtonPressed
    // Rn, props.match.params = {ticker: 'TSM'}
    // I'm assuming props.match is referring to the route path that "matches" the requested path
    const ticker = props.match.params.ticker;

    const [due_diligence, setDD] = React.useState('');

    const history = useHistory(); // Allows us to go back to a previous webpage. 

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Stock: { ticker }
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='primary' variant='contained' onClick = {() => getTickerDetails(ticker, history, setDD) }>
                    Get due diligence
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    { due_diligence }
                </Typography>
            </Grid>
        </Grid>
    );
}
// Goal: access attributes from Models

function getTickerDetails(ticker, history, setDD) { 
    // getTickerDetails is how I can access the database from React? (due_diligence)
    // .then is if fetch() works,  then do this with the returned 'response' argument
    return fetch('/api/get-stock' + '?ticker=' + ticker)
        .then((response) => { 
            // Get the response from fetching the following url and do stuff with it
            if (!response.ok) {
                history.push('/');
            }
            return response.json(); // .then((response.json()) => { }):
        })
        .then((data) => {
            // setDD(data.dd_data);
            console.log(data.dd_data);
        });
}
