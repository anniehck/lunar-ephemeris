import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
})
