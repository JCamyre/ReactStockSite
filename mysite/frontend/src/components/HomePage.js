import React, { Component } from 'react';
import Stock from './Stock';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';


export default function HomePage() {
    return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/create' component={Stock} />
                    <Route path='/stock/:ticker' component={Stock} />
                </Switch>
            </Router>      
    );
}

// export default class HomePage extends Component {
//     constructor (props) {
//         super(props);
//     }
//     // Take all of the different components and import them to the homepage. For a given url, check which path matches, then send it to that component to be updated. Same paths as the one in frontend.urls
//     render() {
//         return (
            
//         );
//     }
// }
// <Autocomplete suggestions={Stock.objects.filter(Q(ticker__icontains=this.ticker))} />

// Use javascript to send GET request to an api.views which, in the class, will return serializer_class(Stock.objects.all())
const allTickers = [
    { ticker: 'TSM', price: 45 },
    { ticker: 'NOK', price: 4 },
]