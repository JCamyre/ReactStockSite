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
    // with /stock/:ticker, we can access 'ticker' in Stock.js
}
