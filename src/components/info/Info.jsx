import React, { Component } from 'react';
import './Info.css';
class Info extends Component {
  render() {
    return (
      <div className="infoContent">
        <h3>{this.props.step}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Info;
