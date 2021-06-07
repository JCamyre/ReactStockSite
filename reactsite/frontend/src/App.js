import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';

export default function App() {
    return (
        <>
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' component={Home}/> 
            </Switch>
        </Router>
        </>
    );
}