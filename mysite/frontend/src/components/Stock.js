import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTable } from 'react-table';
import Table from './Table.js'; // THE ISSUE WAS { Table }. THAT'S WHY ALWAYS GOOGLE ERROR FIRST!!! 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.'

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

    const [data, setData] = useState([]);

    // useEffect makes it so that we call the API only once React done rendering/loading
    useEffect(() => {
        (async () => {
            fetch('/api/get-stock' + '?ticker=' + ticker)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                 })
            })();
        }, []);

    // Limit testing, probably not right. 

    const columns = useMemo(
        () => [
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
            }
        ]
    );

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
                <Typography component='h4' variant='h4'>
                    {/* { due_diligence } */}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                {/* data={[data]} 200 IQ */}
                <Table columns={columns} data={[data]} />
            </Grid>
        </Grid>
    );
}
// Goal: access attributes from Models

// function getTickerDetails(ticker, history) { 
//     // getTickerDetails is how I can access the database from React? (due_diligence)
//     // .then is if fetch() works,  then do this with the returned 'response' argument
//     return fetch('/api/get-stock' + '?ticker=' + ticker)
//         .then((response) => { 
//             // Get the response from fetching the following url and do stuff with it
//             if (!response.ok) {
//                 history.push('/');
//             }
//             return response.json(); 
//         })
//         .then((data) => { // data == response.json()
//             console.log('We have received data in getTickerDetails');
//             const jsonData = [];
//             data.keys.forEach((item, index) => {
//                 const tempDict = {};
//                 tempDict['Col 1'] = item;
//                 tempDict['Col 2'] = data.vals[index];
//                 jsonData.push(tempDict);
//             });
//             console.log(jsonData[0]);
//             console.log(typeof jsonData[0]);
//             console.log(typeof {'Col 1': 2});
//             setTableData(jsonData);
//         })
//         .catch(err => {
//             console.log('SHEEESH!!!!!!', err);
//         });
// }


// function setTableData(jsonData) {
//             // Loop through data.keys and data.vals and assign to tableData
//             tempTableData = useMemo(
//                 () => jsonData,
//                 []
//             );

//             console.log(tempTableData);
                
//             // Would like to make this dynamic, len(tableData[0]) is how many dictionaries for columns. 
//             tempColumns = useMemo(
//                 () => [
//                     {
//                         Header: 'Column 1',
//                         accessor: 'Col 1'
//                     },
//                     {
//                         Header: 'Column 2',
//                         accessor: 'Col 2'
//                     },
//                 ],
//                 []
//             );

//             const tableInstance = useTable({ 
//                 tempColumns, 
//                 data: tempTableData
//             });

//             // Once these hooks' values change (idk proper vocab), React will update, hopefully update <ReactTable />

//             return tableInstance;
// }

