import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Stock from './components/pages/Stock';
import Navbar from './components/Navbar';

export default function App() {
    return (
        <>
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home}/> 
                <Route path='/stock/:ticker' component={Stock}/>
            </Switch>
        </Router>
        </>
    );
}