import React, { Component } from 'react';

import './Details.css';
class Details extends Component {
  render() {
    return (
      <div className="details card">
        <h1 className="title">{this.props.title}</h1>
        <p className="description">{this.props.description}</p>
        <img src={this.props.imgSrc} alt="giff" />
        <span className="arrow">{this.props.arrow}</span>
      </div>
    );
  }
}

export default Details;
