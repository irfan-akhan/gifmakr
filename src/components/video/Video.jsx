import React, { Component } from 'react';

import './Video.css';

class Video extends Component {
  render() {
    return (
      <div className="videoElement">
        <video
          width="80%"
          src={URL.createObjectURL(this.props.videoSrc)}
          controls
        ></video>
      </div>
    );
  }
}

export default Video;
