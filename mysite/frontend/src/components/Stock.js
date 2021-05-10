import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Table from './Table.js';

// Change color of stuff depending on high/low
const ShortF = ({ value }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string

    return (
        <>
            <span className='badge'>
                {value}
            </span>
        </>
    );
}

export default function Stock(props) {
    // props argument is accepting the /stock/:ticker argument, which is from the value in Home.js/stockButtonPressed
    const ticker = props.match.params.ticker;

    const history = useHistory(); // Allows us to go back to a previous webpage. 

    const [fetching, setFetching] = useState(true);

    const [stockNotFound, setNotFound] = useState(false);
  
    const columns1 = Table1();

    const columns2 = Table2();

    const columns3 = Table3();

    // One of the tutorials I was following said I could update information every 5 seconds, find it... good for up to date stock information

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    // What I think async () does: Tells the code in the brackets to only run when called. 
    // Still idk why sometimes data doesn't get fetched
    useEffect(() => { 
        const fetchData = async () => {
            fetch('/api/get-stock' + '?ticker=' + ticker)
                .then((response) => response.json())
                .then((data) => {
                    // I think I can access different parts of json data like this: data['1'], data['2'], data['3']
                    // Why sometimes json data not received: useEffect() runs method only after page fully loads. The table component loads before page fully rendered,
                    // therefore, the data was never setData(), so empty data array sent to table component, causing error.
                    if (data !== null) {
                        setData1(data['data1']);
                        setData2(data['data2']);
                        setData3(data['data3']);
                        setFetching(false);
                        console.log(data1, data2, data3, data);
                    } else {
                        console.log('WTF, Fetch bugged');
                    }
                    }, [])
                .catch(e => {
                    console.log(e);
                    setFetching(false);
                    setNotFound(true);
            })};
        fetchData();
    }, []);

    console.log(data1, data1['Short Float'], data1['Avg Volume']);

    // useMemo() runs during rendering and memoizing a value (runs a complex function, caches value with specific arguments, can access if same args are used). Ex: the fetch() function for accessing stock API.
    // useEffect() runs after all rendering.

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h2' variant='h2'>
                    Stock: { ticker }
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>{ fetching ? 'Fetching data...' : ''}</Typography>
                <Typography component='h2' variant='h4'>{ stockNotFound ? '' : 'Sorry, that stock could not be accessed at this time!'}</Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Table columns={columns1} data={[data1]} />
            </Grid>
            <Grid item xs={12} align='center'>
                <Table columns={columns2} data={[data1]} />
            </Grid>
            <Grid item xs={12} align='center'>
                <Table columns={columns3} data={[data1]} />
            </Grid>            
        </Grid>
    );
}

function Table1() {
    const columns1 = useMemo(() => [
        {
            Header: 'Price',
            accessor: 'Price',
            Cell: ({ cell: { value } }) => <h5>${ value }</h5>
        },
        {
            id: 'shortfloat',
            Header: 'Short Float',
            accessor: 'Short Float',
            // Pass in the custom ShortF component for each cell. Take value from cell, and pass it to <ShortF />
            // Cell: ({ cell: { value } }) => <ShortF value={value} />
        }
    ]);
    return columns1
};

function Table2() {
    const columns2 = useMemo(() => [
        {
            Header: 'Market Cap',
            accessor: 'Market Cap',
        },
        {
            Header: 'Forward P/E',
            accessor: 'Forward P/E',
            Cell: ({ cell: { value } }) => <h5>{ value } P/E</h5>
        }
    ]);
    return columns2
};

function Table3() {
    const columns3 = useMemo(() => [
        {
            id: 'avgvolume',
            Header: 'Average Volume',
            accessor: 'Avg Volume',
        }
    ]);
    return columns3
};
