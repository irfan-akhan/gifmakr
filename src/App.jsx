import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Video from './components/video/Video';
import Giff from './components/giff/Giff';

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

  videoChangeHandler = (e) => {
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
    // return this.state.video ? (
    //   <div className="container">
    //     <video
    //       src={URL.createObjectURL(this.state.video)}
    //       width="650"
    //       controls
    //     ></video>
    //     <button onClick={() => this.generateGiffHandler()}>
    //       Generate Giff
    //     </button>
    //   </div>
    // ) : (
    //   <div className="container">
    //     <input
    //       onChange={(e) => {
    //         this.onVideoChangeHandler(e);
    //       }}
    //       type="file"
    //       name="video"
    //       id="video"
    //     />
    //   </div>
    // );
    return (
      <div className="container">
        <Navbar />
        <main>
          <section className="videoPlayer">
            <Video show />
            <input type="file" onChange={(e) => this.videoChangeHandler(e)} />
          </section>
          <section className="giffElement">
            <Video />
            <button className="button">Download Giff</button>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
