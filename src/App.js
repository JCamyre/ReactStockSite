import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Stock from './components/pages/Stock';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Testing from './components/pages/Testing';
import NavBar from './components/Navbar';
import './App.css';

function App() {
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

export default App;
