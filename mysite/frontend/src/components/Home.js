import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Grid, Button, Typography, IconButton, Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

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
    const [onSelect, setonSelect] = React.useState('');
    const [selection, setSelection] = React.useState('');
    const [error, setError] = React.useState('');

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


    setonSelect(item => setSelection(item));

    const renderItem = (item) => {
        return <div className='searchItem'>{item}</div>
    }

    const renderMenu = (items, _, autocompleteStyle) => {
        cellHeightCache.clearAll();

        const rowRenderer = ({key, index, parent, style}) => {
            const Item = items[index]
            const onMouseDown = e => {
                if (e.button === 0) {
                    Item.props.onClick(e);
                }
            }
            return (
                <CellMeasurer
                    cache={cellHeightCache}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                    >
                        {React.cloneElement(Item, {
                            style: style,
                            key, key,
                            onMouseEnter: null,
                            onMouseDown: onMouseDown
                        })}
                </CellMeasurer>
            )
        }
        return (
            <List 
                rowHeight = {cellHeightCache.rowHeight}
                height={207}
                rowCount = {items.length}
                rowRenderer={rowRenderer}
                width={autocompleteStyle.minWidth || 0}
                style={{
                    //...customStyles,
                    height:'auto',
                    maxHeight: '207px'
                }}
            />    
        )
    }

    const searchTerm = searchingFor;
    // Check our list of options to see if any matches our searchTerm. If there are none, set data to []. 
    const data = searchTerm ? allTickers.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) : []

    return (
        
        <div>
            <br />
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Typography component='h4' variant='h4'>
                        Homepage
                    </Typography>
                    <Autocomplete 
                    id='search-tickers'
                    items={data} // options = {data}
                    classes={classes}
                    value = {searchingFor}
                    renderItem = {renderItem}
                    renderMenu = {renderMenu}
                    // getItemValue = { item => item.value }. Not needed for us since the ticker strings are in the array list
                    // When you select a new value from Autocomplete list, setValue(newValue)
                    onChange = {(e, newValue) => {
                        setValue(newValue);
                    }}
                    onSelect = {onSelect}
                    // renderInput={(params) => (
                    //     <TextField {...params} label='Search Tickers' color='' margin='normal' variant='outlined' />
                    //     )}
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
