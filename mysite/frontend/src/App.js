import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';


export default function App () {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact />
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
