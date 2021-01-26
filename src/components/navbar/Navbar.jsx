import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <navbar>
        <h3 className="logo">LOGO goes here</h3>
        {/* <img src="" alt=""/> */}
        <h1 className="name">Name is here</h1>
      </navbar>
    );
  }
}

export default Navbar;
