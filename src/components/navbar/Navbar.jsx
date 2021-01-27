import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <navbar>
        <h1 className="logo">v2g</h1>
        <h3 className="name">Name is here</h3>
      </navbar>
    );
  }
}

export default Navbar;
