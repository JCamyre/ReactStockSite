import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Stock from './components/pages/Stock';
import Navbar from './components/Navbar';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import ContactUs from './components/pages/ContactUs';
import Footer from './components/Footer';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import storage from 'local-storage-fallback';
import useTheme from './components/useTheme';
import style from 'styled-theming';
import './App.css';


const getBackground = style('mode', {
  light: '#EEE',
  dark: '#111'
});

const getForeground = style('mode', {
  light: '#111',
  dark: '#EEE'
});

const getFontSize = style('textZoom', {
  normal: '1em',
  textZoom: '1.2em'
});

const GlobalStyle = createGlobalStyle`
body, Navbar, Stock {
  background-color: ${getBackground};
  color: ${getForeground};
  font-size: ${getFontSize};
}
`;

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Router>
        <Navbar style={{ transition: 'all 10000ms ease 0s', transitionProperty: 'all', transitionDuration: '10000ms', transitionTimingFunction: 'ease', transitionDelay: '0s'}}
          theme={theme}
        />
        <Switch>
          <Route exact path='/' component={Home}/> 
          <Route path='/stock/:ticker' component={Stock}/>
          <Route path='/about' component={About}/>
          <Route path='/contactus' component={ContactUs}/>
        </Switch>
        <Footer />
      </Router>
    </>
    </ThemeProvider>
  );
}

export default App;
