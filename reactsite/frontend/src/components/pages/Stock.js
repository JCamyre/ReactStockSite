import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Table from '../Table.js';
import CustomStockChart from '../Chart.js';

// Change color of text depending on high/low
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
    // Variables to access the stock ticker for specific webpage and navigate to different webpages. 
    const ticker = props.match.params.ticker;
    const history = useHistory();

    // React state variables
    const [fetching, setFetching] = useState(true);
    const [stockNotFound, setNotFound] = useState(false);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [seriesData, setSeriesData] = useState([]);

    // All columns for the different tables of data.
    const columns1 = Table1();
    const columns2 = Table2();
    const columns3 = Table3();

    // One of the tutorials I was following said I could update information every 5 seconds, find it... good for up to date stock information

    // Once React is done rendering, receive the data for the specific Stock, which will be displayed with the tables. 
    useEffect(() => { 
        const fetchData = async () => {
            fetch('http://localhost:8000/stocks/get-stock?ticker=' + ticker)
                .then((response) => response.json())
                .then((data) => {
                    if (data !== null) {
                        setData1(data['data1']);
                        setData2(data['data2']);
                        setData3(data['data3']);
                        setFetching(false);

                        // CustomStockChart data

                        var seriesData = data['seriesData'];
                        seriesData.forEach((x, i) => {
                            seriesData[i]['date'] = new Date(x['date']);
                        });

                        setSeriesData(seriesData);

                    } else {
                        console.log('Fetch bugged');
                    }
                    }, [])
                .catch(e => {
                    console.log(e);
                    setFetching(false);
                    setNotFound(true);
            })};
        fetchData();
    }, []);
    console.log(seriesData, data1);
    
    return (
        <Grid container spacing={1} className='Body'>
            <Grid item xs={12} align='center'>
                <Typography component='h2' variant='h2'>
                    Stock: { fetching ? 'Loading...' : data1['company_name']} : { ticker }
                    {/* Get name of company */}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>{ fetching ? 'Fetching data...' : ''}</Typography>
                <Typography component='h2' variant='h4'>{ stockNotFound ? 'Sorry, that stock could not be accessed at this time!' : ''}</Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Table columns={columns1} data={[data1]} />
            </Grid>
            <Grid item xs={12} align='center'>
                <CustomStockChart 
                    data = {seriesData}
                    ticker = {ticker}
                />
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
