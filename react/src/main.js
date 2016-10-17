import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'
import Location from './components/Location'

$(function() {
  ReactDOM.render(
    <Location />,
    document.getElementById('app')
  );
});
