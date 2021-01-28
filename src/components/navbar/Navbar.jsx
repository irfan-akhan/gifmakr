import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <navbar>
        <h1 className="logo">v2g</h1>
        <h3 className="name">
          Created by: <span> Khan_Irfan</span>
        </h3>
      </navbar>
    );
  }
}

export default Navbar;
