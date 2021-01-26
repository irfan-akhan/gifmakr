import React, { Component } from 'react';

import './Video.css';

class Video extends Component {
  render() {
    return (
      <div className="videoElement">
        <video width="100%" controls></video>
      </div>
    );
  }
}

export default Video;
