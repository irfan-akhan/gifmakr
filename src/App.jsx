import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { load: false };
  }
  ffmpeg = createFFmpeg({ log: true, videoInput: null });

  load = async () => {
    await this.ffmpeg.load();
    this.setState({ load: true });
  };
  componentDidMount() {
    this.load();
  }

  onVideoChangeHandler = (e) => {
    const file = e.target.files[0];
    this.setState({ video: file });
  };

  render() {
    return this.state.video ? (
      <div>
        <video
          src={URL.createObjectURL(this.state.video)}
          width="650"
          controls
        ></video>
        <button>Generate Giff</button>
      </div>
    ) : (
      <div>
        <input
          onChange={(e) => {
            this.onVideoChangeHandler(e);
          }}
          type="file"
          name="video"
          id="video"
        />
      </div>
    );
  }
}

export default App;
