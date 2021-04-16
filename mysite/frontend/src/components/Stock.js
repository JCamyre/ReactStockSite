import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';

export default function Stock(props) {
    // props argument is accepting the /stock/:ticker argument, which is from the value in Home.js/stockButtonPressed
    // Rn, props.match.params = {ticker: 'TSM'}
    // I'm assuming props.match is referring to the route path that "matches" the requested path
    const ticker = props.match.params.ticker;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Stock: { ticker }
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}
// Goal: access attributes from Models

function getTickerDetails(ticker) {
    // getTickerDetails is how I can access the database from React? (due_diligence)
    // .then is if fetch() works,  then do this with the returned 'response' argument
    return fetch('/api/get-stock' + '?ticker=' + ticker)
    .then((response) => {
        // Get the response from fetching the following url and do stuff with it
        if (!response.ok) {
            history.push('/')
        }
        return response.json();
    })
    .then((data) => {
        const [ticker, setTicker] = useState(data.ticker),
    });
}

// fetch('/api/stock/ticker').then((response) => ({

// })

// export default class Stock extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             stock: 'None',
//         };
//         // Get ticker after clicking stock link from search_results page. localhost:8000/stock/TSM. this.ticker = TSM
//         this.ticker = this.props.match.params.roomCode;

//     }

//     render() {
//         return (
//             <p>Yo</p>
//         )
//     }

//     getStockDetails() {
//         fetch('/api/get-stock' + '?ticker=' + this.ticker)
//             .then((response) => response.json())
//             .then((data) => {
//                 this.setState({
//                     stock: data.stock,
//                 })
//             });
//         }
// }