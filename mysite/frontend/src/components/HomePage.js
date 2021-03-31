import React, { Component } from 'react';
import Stock from './Stock';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export default class HomePage extends Component {
    constructor (props) {
        super(props);
    }
    // Take all of the different components and import them to the homepage. For a given url, check which path matches, then send it to that component to be updated. Same paths as the one in frontend.urls
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <p>This is the home page.</p> 
                    </Route>
                    <Route path='/create' component={CreatePortfolioPage} />
                    <Route path='/stock/:ticker' component={Stock} />
                </Switch>
            </Router>
        );
    }
}