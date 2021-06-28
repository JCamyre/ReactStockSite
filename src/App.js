import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Stock from './components/pages/Stock';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import ContactUs from './components/pages/ContactUs';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar style={{ transition: 'all 10000ms ease 0s', transitionProperty: 'all', transitionDuration: '10000ms', transitionTimingFunction: 'ease', transitionDelay: '0s'}}/>
        <Switch>
          <Route exact path='/' component={Home}/> 
          <Route path='/stock/:ticker' component={Stock}/>
          <Route path='/about' component={About}/>
          <Route path='/contactus' component={ContactUs}/>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
