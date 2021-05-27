import React from 'react';
import { Grid, Button, Typography, IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import VirtualizedAutocomplete from '../VirtualizedAutocomplete.js';
import CustomCarousel from '../CustomCarousel.js';
import HeroSection from '../HeroSection.js';


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

    const [searchingFor, setsearchingFor] = React.useState('');
    const [selection, setSelection] = React.useState('');
    const [error, setError] = React.useState('');
    const [data, setData] = React.useState(['Loading...']);

    // Other variables
    const history = useHistory();
    const classes = useStyles();

    // Returns the full list of stocks from Django database from '/api/get-all-stocks' once React app finishes loading. 
    React.useEffect(() => {
        const fetchData = async () => {
            fetch('/api/get-all-stocks')
                .then((response) => response.json())
                .then((data) => {
                    if (data['Stock not found']) {
                        console.log('uh ohhh');
                    }
                    else if (data!==null) {
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
        
        <div className='center'>
        <br />
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography component='h2' variant='h2' style={{'color': 'rgb(110, 88, 255)'}}>
                        Homepage
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <VirtualizedAutocomplete 
                    // When you pass in a variable to a React component parameter, it is sent as a JSON object. 
                        data = {data}
                        setter = {setSelection}
                    />
                </Grid>
                <Grid item xs={12} align='center'>
                    <span>&nbsp;</span>
                </Grid>
                <Grid item xs={12} align='center'>
                    {/* How to increase size of button? */}
                    <Button color='primary' variant='contained' to='/create' component={ Link } 
                    onClick={() => {
                        stockButtonPressed(selection, history, setError)
                    }}>
                        Information （{selection})
                    </Button>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Typography component='h3' variant='h3'>{ fetching ? 'Loading stocks...' : '' }</Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <CustomCarousel />
                </Grid>
                <HeroSection />
            </Grid>        
        </div>
    );
}

function stockButtonPressed(ticker, history, setError) {
    const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken")           
        },
        body: JSON.stringify({
            ticker: ticker,
        }),
    };

    fetch("/api/find-stock", requestOptions)
    .then((response) => {
        if (response.ok) {
            history.push(`/stock/${ticker}`);
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