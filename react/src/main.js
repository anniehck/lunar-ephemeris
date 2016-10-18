import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Location from './components/Location';
import About from './components/About';
import MoonStats from './components/MoonStats';

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/location" component={Location} />
        <Route path="/about" component={About} />
        <Route path="/moon" component={MoonStats} />
      </Route>
    </Router>
    ,
    document.getElementById('app')
  );
});
