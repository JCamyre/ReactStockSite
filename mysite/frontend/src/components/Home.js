import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Grid, Button, Typography, IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

// Add styles to Autocomplete component
// https://material-ui.com/api/autocomplete/, can use index.css
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

// How to access database from React JS code. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

const allTickers = ['BABA', 'BILI', 'DADA', 'JD', 'PDD', 'TSM', 'VIPS'].sort();

export default function Home() {
    // I'm assuming React.useState() will accept initial value for the state "value" and creates a function called setValue, which will 
    // Change the 'state' of value (which is tied to the Autocomplete tag) to the value passed to it.

    // Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class, so convenient!
    // "The useState Hook. A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components.
    const [allTickers, setAllTickers] = React.useState([]);
    const [value, setValue] = React.useState([]);
    const [fetching, setFetching] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            fetch('/api/get-all-stocks')
                .then((response) => response.json())
                .then((data) => {
                    if (data!==null) {
                        setAllTickers(data['all_tickers'].sort());
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

    console.log(allTickers);
 
    // useState returns two values, the initial value of the state, and the function for updating the state variable

    const [error, setError] = React.useState('');

    const history = useHistory();

    const classes = useStyles();

    return (
        <div>
            {/* Have to use {``} to write in javascript and display in HTML */}
            {/* If value is not null, display value, otherwise null */}
            <br />
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography component='h4' variant='h4'>
                        Homepage
                    </Typography>
                    <Autocomplete 
                    id='search-tickers'
                    classes={classes}
                    value = {value}
                    // Don't get this "onChange" line
                    onChange = {(event, newValue) => {
                        setValue(newValue);
                    }}
                    options={allTickers}
                    renderInput={(params) => (
                        <TextField {...params} label='Search Tickers' color='' margin='normal' variant='outlined' />
                        )}
                    style={{ width: 300 }}
                    />
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
// Handle routing with react-router. We want to route to the localhost:8000/api/view-stock to GET the stock information we need to display localhost:8000/stock/TSM
// onPush, can I pass in {value} myself? Or have to access somehow.
function stockButtonPressed(ticker, history, setError, value) {
    const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify({
            // will change to stock.ticker (since I want stocks to be dictionary)
            // localhost:8000/stock?ticker= takes place, so that in the views.py, I can access the user's POST request data
            ticker: ticker,
        }),
    };
    // The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. 
    // It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.
    fetch("/api/find-stock", requestOptions) // Getting 403 error for all API POST requests...
    .then((response) => {
        if (response.ok) {
            // history.push pushes a new entry into the history stack, basically redirecting the user to a new route/path (only paths for components? redirects them to localhost:8000/stock/TSM)
            history.push(`/stock/${value}`);
        } else {
            setError('Stock not found.');
        }
    }).catch((error) => {
        console.log(error);
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}