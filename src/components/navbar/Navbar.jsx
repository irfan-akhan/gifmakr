import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <navbar>
        <h1 className="logo">v2g</h1>
        <div className="links">
          <a href="#how-it-works">How it works</a>
          <a href="#get-started">Get started</a>
        </div>
        <a className="contact" href="#footer">
          Get in Touch
        </a>
      </navbar>
    );
  }
}

export default Navbar;
