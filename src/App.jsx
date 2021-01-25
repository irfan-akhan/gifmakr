import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { load: false };
    this.ffmpeg = createFFmpeg({ log: true, videoInput: null });
  }

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

  generateGiffHandler = async () => {
    this.ffmpeg.FS(
      'writeFile',
      'buffer.mp4',
      await fetchFile(this.state.video),
    );
  };

  render() {
    return this.state.video ? (
      <div>
        <video
          src={URL.createObjectURL(this.state.video)}
          width="650"
          controls
        ></video>
        <button onClick={() => this.generateGiffHandler()}>
          Generate Giff
        </button>
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
