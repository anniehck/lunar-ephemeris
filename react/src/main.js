import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './pages/App';
import Home from './pages/Home';
import Location from './pages/Location';
import MoonStats from './pages/MoonStats';
import Gallery from './pages/Gallery';
import Apod from './pages/Apod';
import Reviews from './pages/Reviews';

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/location" component={Location} />
        <Route path="/moon" component={MoonStats} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/apod" component={Apod} />
        <Route path="/reviews" component={Reviews} />
      </Route>
    </Router>
    ,
    document.getElementById('app')
  );
});
