import React, { useState, useEffect, useMemo } from 'react';
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

    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    // useEffect makes it so that we call the API only once React done rendering/loading
    useEffect(() => {
        (async () => {
            fetch('/api/get-stock' + '?ticker=' + ticker)
                .then((response) => response.json())
                .then((data) => {
                    // I think I can access different parts of json data like this: data['1'], data['2'], data['3']
                    setData1(data['data1']);
                 })
            })();
        }, []);

        // Limit testing, probably not right. 
        
    const [columns1, setColumns1] = useState([]);
    const [columns2, setColumns2] = useState([]);
    const [columns3, setColumns3] = useState([]);

    Table1();
    
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

function Table1() {
    setColumns1(useMemo(
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
    ));
}