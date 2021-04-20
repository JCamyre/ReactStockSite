import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTable } from 'react-table';

export default function Stock(props) {
    // props argument is accepting the /stock/:ticker argument, which is from the value in Home.js/stockButtonPressed
    // Rn, props.match.params = {ticker: 'TSM'}
    // I'm assuming props.match is referring to the route path that "matches" the requested path
    const ticker = props.match.params.ticker;

    // Saves data, so React doesn't perform logic everytime the webpage is loaded
    const tableData = useMemo(
        () => [
            {
                yocol1: 'yo',
                yocol2: 'yo2',
            },
            {
                yocol1: 'yoagain',
                yocol2: 'yoagain2',
            }
        ],
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Keys',
                accessor: 'yocol1'
            },
            {
                Header: 'Values',
                accessor: 'yocol2'
            },
        ],
        []
    );

    // const tableInstance = React.useState('');
    const tableInstance = useTable({ 
        columns, 
        data: tableData // Have to do data: tableData, can't just have plain tableData
    })

    const { // I think this is like a, b, c = list.split(), but with methods
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance 



    // const [due_diligence, setData] = React.useState(tableData);

    // const table, setTable = React.useState('');


    // function due_diligence() {
    //     data.keys, data.values
    //     const tableData = useMemo(() => [
        
    //     ]
    // }
    // List of dictionaries
    const arr = [];
    // myMap.put('Key', item)
    const dummyKeys = ['P/E', 'Market Cap', '52w lows', 'ATH'];
    const dummyVals = ['29.5', '8.31 b', '4.50', '461'];
    dummyKeys.forEach((item, index) => {
        const tempDict = {};
        tempDict['Col 1'] = item;
        tempDict['Col 2'] = dummyVals[index];
        arr.push(tempDict);
    });
    console.log(arr);
    
    const history = useHistory(); // Allows us to go back to a previous webpage. 

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography component='h2' variant='h2'>
                    Stock: { ticker }
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='primary' variant='contained' onClick = {() => getTickerDetails(ticker, history, '') }>
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
                    {/* { due_diligence } */}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <table {...getTableProps()}>
                <thead>
                        {
                        // loop through headerGroups, for each headerGroup, map the columns and render the 'Header' label for each column
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            { column.render('Header') }
                                        </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            </Grid>
        </Grid>
    );
}
// Goal: access attributes from Models

function getTickerDetails(ticker, history, setData) { 
    // getTickerDetails is how I can access the database from React? (due_diligence)
    // .then is if fetch() works,  then do this with the returned 'response' argument
    return fetch('/api/get-stock' + '?ticker=' + ticker)
        .then((response) => { 
            // Get the response from fetching the following url and do stuff with it
            if (!response.ok) {
                history.push('/');
            }
            return response.json(); 
        })
        .then((data) => { // data == response.json()
            // setData(data.dd_keys);
            console.log(data.keys, data.vals);
            // Loop through data.keys and data.vals and assign to tableData
        //     const tableData = useMemo(
        //         () => [
        //             // {
        //             //     yocol1: 'yo',
        //             //     yocol2: 'yo2',
        //             // },
        //             // {
        //             //     yocol1: 'yoagain',
        //             //     yocol2: 'yoagain2',
        //             // }
        //         ],
        //         []
        //     );
        
        //     const columns = useMemo(
        //         () => [
        //             // {
        //             //     Header: 'Column 1',
        //             //     accessor: 'yocol1'
        //             // },
        //             // {
        //             //     Header: 'Column 2',
        //             //     accessor: 'yocol2'
        //             // },
        //         ],
        //         []
        //     );
        });
        // renderTable();
}

// function renderTable() {
//     return (

//     )
// }
