import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';

export default function Stock() {
    const ticker = None;
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    Insert stock here
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