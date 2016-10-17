import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';

$(function() {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
    ,
    document.getElementById('app')
  );
});
