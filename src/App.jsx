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

  onChangeHandler = (e) => {
    console.log(e);
  };

  render() {
    return this.state.video ? (
      <div>hi</div>
    ) : (
      <div>
        <input
          onChange={(e) => {
            this.onChangeHandler(e);
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
