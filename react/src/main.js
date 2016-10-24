import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import Location from './pages/Location';
import About from './pages/About';
import MoonStats from './pages/MoonStats';
import Apod from './pages/Apod';
import Reviews from './pages/Reviews';

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/location" component={Location} />
        <Route path="/about" component={About} />
        <Route path="/moon" component={MoonStats} />
        <Route path="/apod" component={Apod} />
        <Route path="/reviews" component={Reviews} />
      </Route>
    </Router>
    ,
    document.getElementById('app')
  );
});
