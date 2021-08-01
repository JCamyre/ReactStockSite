import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Table from '../Table.js';
import StockChart from '../Chart.js';
import News from '../News';
import DotLoader from 'react-spinners/DotLoader';
import Signals from '../Signals';
import Rating from '../Rating';

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

    // React state variables
    const [fetching, setFetching] = useState(true);
    const [stockNotFound, setNotFound] = useState(false);
    const [data1, setData1] = useState([]);
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
                    // if (data['Stock not found'] !== null){
                    //     setNotFound(true);
                    // }
                    if (data !== null) {
                        setData1(data['data1']);
                        setFetching(false);

                        // Maybe make News.jsx component. But then would have to have separate views for each piece of information...
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
    
    return (
        <Grid container spacing={1} className='Body'>
            <Grid item xs={12} align='center'>
                { fetching && (
                    <DotLoader />
                )}
                { !fetching && (
                    <div>
                        <Typography component='h2' variant='h2'>
                            ${ ticker }
                        </Typography>
                        <Typography component='h4' variant='h4'>
                            {data1['company_name']}
                        </Typography>
                    </div>
                )}
            </Grid>
            <Grid item xs={12} align='center'>
                <Rating
                    data={data1} 
                />
            </Grid>
            <Grid item xs={12} align='center'>
                <Signals 
                    data={data1}
                />
            </Grid>
            <Grid item xs={12} align='center'>
                <StockChart 
                    ticker={ticker}    
                />
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>{ fetching ? 'Fetching data...' : ''}</Typography>
                <Typography component='h2' variant='h4'>{ stockNotFound ? 'Sorry, that stock could not be accessed at this time!' : ''}</Typography>
            </Grid>
            <div style={{boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
                            padding: '15px -15px 15px -15px', borderRadius: '6px', width: '1400px', margin: 'auto', backgroundColor: '#fff',
                            zIndex: 1}}>
                <Grid item xs={12} align='center'>
                    <Table columns={columns1} data={[data1]} />
                </Grid>

                <Grid item xs={12} align='center'>
                    <Table columns={columns2} data={[data1]} />
                </Grid>
                <Grid item xs={12} align='center'>
                    <Table columns={columns3} data={[data1]} />
                </Grid>
                {/* Add rel volume, today's volume */}
                <News 
                    ticker={ticker}
                />
            </div>
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
