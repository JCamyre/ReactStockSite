import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import VirtualizedAutocomplete from '../VirtualizedAutocomplete.js';
import { Button } from '../Button';
// import CustomCarousel from '../CustomCarousel.js';
// import HeroSection from '../HeroSection.js';
// import Cards from '../Cards.js';

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
            fetch('/stocks/api/get-all-stocks')
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
        
        <div>
        <br />
            <VirtualizedAutocomplete 
                data = {data}
                setter = {setSelection}
            />
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
            <Button 
                    className='btns'
                    buttonSize='btn--large'
            > yo </Button>
        <img src='https://wallpapercave.com/wp/wp4676570.jpg' />
        </div>
    )
}
