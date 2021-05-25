import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


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
            <div className='center'>
                <HomePage />
            </div>
        </>
    );
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);
