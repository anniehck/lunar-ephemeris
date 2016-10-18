import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

export default React.createClass({
  render() {
    return (
      <div>
        <ul role="nav">
          <li><NavLink to="/" activeClassName="active" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/location">Location</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
})
