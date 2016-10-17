import 'babel-polyfill';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="/about" component={About} />
      </Route>
    </Router>
    ,
    document.getElementById('app')
  );
});
