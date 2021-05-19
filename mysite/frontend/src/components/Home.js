import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Grid, Button, Typography, IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import VirtualizedAutocomplete from './VirtualizedAutocomplete.js';


const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            transform: 'translate(34px, 20px) scale(1);'
        }
    },
    inputRoot: {
        color: 'white',
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            // Default left padding is 6px
            paddingLeft: 26
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
    },
    option: {
        '&[data-focus="true"]': {
            backgroundColor: '#F8F8F8',
            borderColor: 'transparent'
        },
        '&[aria-selected="true"]': {
            backgroundColor: theme.palette.grey.A200,
            borderColor: 'transparent',
        }
    }
}));

export default function Home() {
    // All variables with React state.
    const [allTickers, setAllTickers] = React.useState([]);
    const [value, setValue] = React.useState([]);
    const [fetching, setFetching] = React.useState(true);

    const [cellHeightCache, setcellHeightCache] = React.useState(new CellMeasurerCache({
        defaultHeight: 42,
        fixedWidth: true
    }));
    const [searchingFor, setsearchingFor] = React.useState('');
    const [selection, setSelection] = React.useState('');
    const [error, setError] = React.useState('');
    const [data, setData] = React.useState(['A']);

    // Other variables
    const history = useHistory();
    const classes = useStyles();

    // Returns the full list of stocks from Django database from '/api/get-all-stocks' once React app finishes loading. 
    React.useEffect(() => {
        const fetchData = async () => {
            fetch('/api/get-all-stocks')
                .then((response) => response.json())
                .then((data) => {
                    if (data!==null) {
                        const tickers = data['all_tickers'].sort()
                        setData(tickers);
                        setSelection(tickers[0]);
                        setFetching(false);
                    } else {
                        console.log('Something bugged while accessing API');
                    }
                }, [])
            .catch(e => {
                console.log(e);
                setFetching(false);
            })}
        fetchData();
    }, []);

    return (
        
        <div>
            <br />
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography component='h4' variant='h4'>
                        Homepage
                    </Typography>
                    <VirtualizedAutocomplete 
                    // When you pass in a variable to a React component parameter, it is sent as a JSON object. 
                        data = {data}
                        onSelect = {(ticker) => {
                            console.log('yo')
                        }}
                    />
                    {/* <Autocomplete 
                    id='search-tickers'
                    options={data}
                    classes={classes}
                    value = {value}
                    renderItem = {renderItem}
                    renderMenu = {renderMenu}
                    // getItemValue = { item => item.value }. Not needed for us since the ticker strings are in the array list
                    // When you select a new value from Autocomplete list, setValue(newValue)

                    // 
                    // onChange = {(e, newValue) => {
                    //     // onChangeHandle();
                    //     setValue(newValue);
                    // }}
                    // When you select an item from Autocomplete list
                    onSelect = {(item) => {
                        setSelection(item);
                    }}
                    // onUpdateInput = {updateOptions}
                    // Need renderInput for Autocomplete tag. 
                    renderInput={(params) => (
                        <TextField {...params} label='Search Tickers' margin='normal' variant='outlined' />
                        )}
                    style={{ width: 300 }}
                    /> */}
                </Grid>
                <Grid item xs={12} align='center'>
                    {/* How to increase size of button? */}
                    <Button color='primary' variant='contained' to='/create' component={ Link } 
                    onClick={() => {
                        stockButtonPressed(value, history, setError, value)
                    }}>
                        Information （{value})
                    </Button>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography component='h3' variant='h3'>{ fetching ? 'Fetching...' : '' }</Typography>
                </Grid>
            </Grid>        
        </div>
    );
}

function stockButtonPressed(ticker, history, setError, value) {
    const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ticker: ticker,
        }),
    };
    fetch("/api/find-stock", requestOptions)
    .then((response) => {
        if (response.ok) {
            history.push(`/stock/${value}`);
        } else {
            setError('Stock not found.');
        }
    }).catch((error) => {
        console.log(error);
    });
}
