import React from 'react';
import { Grid, Button, Typography, IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import VirtualizedAutocomplete from '../VirtualizedAutocomplete.js';
import HeroSection from '../HeroSection.js';
import Cards from '../Cards.js';
import jQuery from 'jquery';
import Chart from '../Chart';
import Parallax from '../Parallax';
import bg_img from '../../images/bg-img-1.jpg';
import Footer from '../Footer';

// Stuff from landingPage.js (styles)
const containerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  };

const container = {
    ...containerFluid,
    "@media (min-width: 576px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
  };
const title = {
  color: "#3C4858",
  margin: "1.75rem 0 0.875rem",
  textDecoration: "none",
  fontWeight: "700",
  fontFamily: `"Roboto Slab", "Times New Roman", serif`,
};

const styles = {
    container: {
      zIndex: "12",
      color: "#FFFFFF",
      ...container,
    },
    title: {
      ...title,
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      color: "#FFFFFF",
      textDecoration: "none",
    },
    subtitle: {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0",
    },
    main: {
      background: "#FFFFFF",
      position: "relative",
      zIndex: "3",
    },
    mainRaised: {
      margin: "-60px 30px 0px",
      borderRadius: "6px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
  };
  
const useStyles = makeStyles(styles);

// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
//             transform: 'translate(34px, 20px) scale(1);'
//         }
//     },
//     inputRoot: {
//         color: 'white',
//         '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//             // Default left padding is 6px
//             paddingLeft: 26
//         },
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//         borderColor: "white"
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//         borderColor: "white"
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//         borderColor: "white"
//     },
//     option: {
//         '&[data-focus="true"]': {
//             backgroundColor: '#F8F8F8',
//             borderColor: 'transparent'
//         },
//         '&[aria-selected="true"]': {
//             backgroundColor: theme.palette.grey.A200,
//             borderColor: 'transparent',
//         }
//     }
// }));

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
    // const classes = useStyles();

    // Returns the full list of stocks from Django database from '/api/get-all-stocks' once React app finishes loading. 
    React.useEffect(() => {
        const fetchData = async () => {
            fetch('http://localhost:8000/stocks/get-all-stocks')
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

    const classes = useStyles();

    const image = require("../../images/bg-img-1.jpg").default;
    return (
        
        <div style={{backgroundColor: '#e5e5e5'}}>
            <Grid container spacing={1}>
                {/* <Grid item xs={12} align='center'>
                    <HeroSection />
                </Grid>
                <Cards />
                <LandingPage />
                <Grid item xs={12} align='center'>
                    <Typography component='h2' variant='h2' style={{'color': 'rgb(110, 88, 255)'}}>
                        Homepage
                    </Typography>
                </Grid>
                */}
                <div className="container" style={{margin: 'auto', color: '#3c4858', fontWeight: '300px', fontFamily: ['Roboto', 'Helvetica'],
                    lineHeight: '1.5em', backgroundColor: '#e5e5e5'}}>
                    <div style={{backgroundColor: 'rgb(0, 0, 0)', position: 'absolute', width: '1600px', height: '800px', 
                    boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)'}}>
                        
                    </div>
                {/* , width: '70%', minWidth: '800px', */}
                    <div style={{borderRadius: '6px', backgroundImage: "url(" + image + ")", backgroundSize: 'auto', 
                        boxShadow: '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)', 
                        minWidth: '1200px', minHeight: '675px', padding: '0px 35px 0px 35px', position: 'relative',
                        backgroundColor: 'rgb(110, 88, 255)'}}>
                        <Grid item xs={12} align='center'>
                            <Typography component='h2' variant='h2' style={{color: '#FFFFFF'}}>
                                Homepage
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <VirtualizedAutocomplete
                                data = {data}
                                setter = {setSelection}
                                color='#FFFFFF'
                            />
                        </Grid>
                        {/* <Cards style={{borderRadius: '6px'}} /> */}   
                    </div>    
                    <Footer />
                </div>


                {/*
                <Grid item xs={12} align='center'>
                    <Typography component='h3' variant='h3'>{ fetching ? 'Loading stocks...' : '' }</Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                    <CustomCarousel />
                </Grid> */}
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

    fetch("http://localhost:8000/stocks/find-stock", requestOptions)
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