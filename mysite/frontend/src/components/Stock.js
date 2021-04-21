import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon} from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTable } from 'react-table';
import ReactTable from './ReactTable.js'; // THE ISSUE WAS { ReactTable }. THAT'S WHY ALWAYS GOOGLE ERROR FIRST!!! 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.'

export default function Stock(props) {
    // props argument is accepting the /stock/:ticker argument, which is from the value in Home.js/stockButtonPressed
    // Rn, props.match.params = {ticker: 'TSM'}
    // I'm assuming props.match is referring to the route path that "matches" the requested path
    const ticker = props.match.params.ticker;

    // Saves data, so React doesn't perform logic everytime the webpage is loaded
    const [tableData, setTableData] = React.useState('');

    const [columns, setColumns] = React.useState('');

    const [tableInstance, setTableInstance] = React.useState(''); 

    const history = useHistory(); // Allows us to go back to a previous webpage. 

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
                {/* <ReactTable tableInstance={tableInstance} /> */}
            </Grid>
        </Grid>
    );
}
// Goal: access attributes from Models

function getTickerDetails(ticker, history, setTableData, setColumns, setTableInstance, columns, tableData) { 
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
            // Placeholder data (until getTickerDetails ran)
         
            const jsonData = [];
            data.keys.forEach((item, index) => {
                const tempDict = {};
                tempDict['Col 1'] = item;
                tempDict['Col 2'] = data.vals[index];
                jsonData.push(tempDict);
            });
            console.log(jsonData);
            setTableData(jsonData, setTableData, setColumns, setTableInstance, columns, tableData);
        });
}


function setTableData(jsonData, setTableData, setColumns, setTableInstance, columns, tableData) {
            // Loop through data.keys and data.vals and assign to tableData
            tempTableData = useMemo(
                () => jsonData,
                []
            );
                
            // Would like to make this dynamic, len(tableData[0]) is how many dictionaries for columns. 
            tempColumns = useMemo(
                () => [
                    {
                        Header: 'Column 1',
                        accessor: 'Col 1'
                    },
                    {
                        Header: 'Column 2',
                        accessor: 'Col 2'
                    },
                ],
                []
            );
            setTableData(tempTableData);
            setColumns(tempColumns);

            const tempInstance = useTable({ 
                columns, 
                data: tableData
            });

            // Once these hooks' values change (idk proper vocab), React will update, hopefully update <ReactTable />

            setTableInstance(tempInstance);
}

