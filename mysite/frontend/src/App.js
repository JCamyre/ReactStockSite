import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Stock from './components/Stock';
import Navbar from './components/Navbar';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Rename homepage to home, delete home.js?

export default function App () {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/stock/:ticker' component={Stock} />
                    <Route path='/about' component={About} />
                    <Route path='/sign-in' component={SignIn} />
                    <Route path='/sign-up' component={SignUp} />
                </Switch>
            </Router>
        </>
    );
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);
