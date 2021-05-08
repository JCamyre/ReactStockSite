import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTable } from 'react-table';
import Table from './Table.js'; // THE ISSUE WAS { Table }. THAT'S WHY ALWAYS GOOGLE ERROR FIRST!!! 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.'

// Change color of stuff depending on high/low
const ShortF = ({ value }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string

    return (
        <>
            {/* {values.map((shortfloat, idx) => {
                return ( */}
                    <span className='badge'>
                        {value}
                    </span>
                {/* ); */}
            {/* })} */}
        </>
    );
}

export default function Stock(props) {
    // props argument is accepting the /stock/:ticker argument, which is from the value in Home.js/stockButtonPressed
    // Rn, props.match.params = {ticker: 'TSM'}
    // I'm assuming props.match is referring to the route path that "matches" the requested path
    const ticker = props.match.params.ticker;

    // Saves data, so React doesn't perform logic everytime the webpage is loaded

    const history = useHistory(); // Allows us to go back to a previous webpage. 

    const [fetching, setFetching] = useState(true);

    // set up dummy data, specific for each table
    const columns1 = useMemo(() => [
        {
            id: 'avgvolume',
            Header: 'Average Volume',
            accessor: 'Avg Volume',
            // Cell: ({ cell: { value } }) => <h1>{value}</h1>
        },
        {
            id: 'shortfloat',
            Header: 'Short Float',
            accessor: 'Short Float',
            // Pass in the custom ShortF component for each cell. Take value from cell, and pass it to <ShortF />
            // Cell: ({ cell: { value } }) => <ShortF value={value} />
        }]);

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

    const columns3 = useMemo(() => [
        {
            Header: 'Price',
            accessor: 'Price',
            Cell: ({ cell: { value } }) => <h5>${ value }</h5>
        }
    ]);
    

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    // useEffect makes it so that we call the API only once React done rendering/loading
    // Maybe no useMemo() up here?
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
            })};
        fetchData();
    }, []);

    console.log(data1, data1['Short Float'], data1['Avg Volume']);

    // const [columns1, setColumns1] = useState([]);
    // const [columns2, setColumns2] = useState([]);
    // const [columns3, setColumns3] = useState([]);



    // useEffect waits for page to render before performing logic. So idk what useMemo actually did for me when used to setColumns...
    // "Remember that the function passed to useMemo runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering. For example, side effects belong in useEffect, not useMemo."
    // Memoization: optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
    
    // useEffect(() => {
    //     Table1(setColumns1);
    
    //     Table2(setColumns2);
    
    //     Table3(setColumns3);
    // });
        
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

// Current issue, useEffect only runs after rendering, which is good cause the data from /api/ doesn't come until rendered. However, the ReactTable is returning nothing, which is a problem. 
// function ReactTable(columns, data) {
//     return <div>yo</div>
//     useEffect(() => {
//         return <Table columns={[columns]} data={[data]} />
//     });
// }   

function Table1(setColumns) {
    // got rid of useEffect()
    setColumns(
        {
            Header: 'Average Volume',
            accessor: 'Avg Volume',
            Cell: ({ cell: { value } }) => <h1>{value}</h1>
        },
        {
            Header: 'Short Float',
            accessor: 'Short Float',
            // Pass in the custom ShortF component for each cell. Take value from cell, and pass it to <ShortF />
            Cell: ({ cell: { value } }) => <ShortF value={value} />
            // Cell: ({ cell: { value } }) => <h2>{value}</h2>
        });
}

function Table2(setColumns) {
        setColumns(
            {
                Header: 'Market Cap',
                accessor: 'Market Cap',
            },
            {
                Header: 'Forward P/E',
                accessor: 'Forward P/E',
            }
        )};

function Table3(setColumns) {
    setColumns(
            {
                Header: 'The Third Value',
                accessor: 'Key 3',
            },
            {
                Header: 'The Fourth Value',
                accessor: 'Key 4',
            }
    )};
