import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Stock from './components/pages/Stock';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import './App.css';

function App() {
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

export default App;
