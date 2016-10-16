import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home'

$(function() {
  ReactDOM.render(
    <Home />,
    document.getElementById('app')
  );
});
