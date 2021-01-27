import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Video from './components/video/Video';

import './App.css';
import Info from './components/info/Info';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      video: null,
      giff: null,
      start: 0,
      duration: 1,
    };
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
    console.log(this.state.video);
    this.setState({ video: file });
  };

  inputStartChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({ start: e.target.value });
    console.log('sate is: ', this.state.start);
  };

  inputDurationChangeHandler = (e) => {
    this.setState({ duration: e.target.value });
    console.log('sate is: ', this.state.duration);
  };

  downloadGiffHandler = (address) => {
    fetch(address)
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'image.png'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  generateGiffHandler = async (e) => {
    console.log('state', this.state.start, this.state.duration);
    // write file to local memory
    this.ffmpeg.FS(
      'writeFile',
      'buffer.mp4',
      await fetchFile(this.state.video),
    );
    //convert file to giff
    await this.ffmpeg.run(
      '-ss',
      `${this.state.start}`,
      '-t',
      `${this.state.duration}`,
      '-i',
      'buffer.mp4',
      '-r',
      '15',
      '-f',
      'gif',
      'output.giff',
    );
    // Read result from local memory
    const result = this.ffmpeg.FS('readFile', 'output.giff');
    // create a url
    const url = URL.createObjectURL(
      new Blob([result.buffer], { type: 'img/giff' }),
    );
    this.setState({ giff: url });
    console.log('in giff', url);
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
    {
      // let src = URL.createObjectURL(this.state.video);
    }
    return (
      <div className="container">
        <Navbar />
        <main>
          <section className="videoPlayer">
            {this.state.video ? (
              <div className="controls">
                <Video videoSrc={this.state.video} />
                <div>
                  <label htmlFor="start">Statring point</label>
                  <input
                    placeholder="hh:mm:ss"
                    onChange={(e) => {
                      this.inputStartChangeHandler(e);
                    }}
                    type="text"
                    name="start"
                    id="start"
                  />
                  <label htmlFor="duration">Duration</label>
                  <input
                    placeholder="hh:mm:ss"
                    onChange={(e) => {
                      this.inputDurationChangeHandler(e);
                    }}
                    type="text"
                    name="duration"
                    id="duration"
                  />
                  <button
                    className="button"
                    onClick={(e) => {
                      this.generateGiffHandler(e);
                    }}
                  >
                    Generate Giff
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <img
                  src="https://i.ibb.co/2hgB0s5/noun-Upload-1560879-removebg-preview.png"
                  alt="upload-img"
                ></img>
                <h2>Select a video file</h2>
                <div className="buttonWrap">
                  <label className="newButton" htmlFor="upload">
                    Upload Video
                  </label>
                  <input
                    type="file"
                    id="upload"
                    onChange={(e) => this.videoChangeHandler(e)}
                  />
                </div>
              </div>
            )}
          </section>
          <section className="giffElement">
            {this.state.giff ? (
              <div className="giffDownload">
                {/* <Video videoSrc={this.state.giff} /> */}
                <img src={this.state.giff} alt="giff" />

                <button
                  className="button"
                  onClick={(e) => {
                    this.downloadGiffHandler(this.state.giff);
                  }}
                >
                  Download Giff
                </button>
              </div>
            ) : (
              <div className="info">
                <Info step="1" description="Upload" />
                <Info step="2" description="Generate" />
                <Info step="3" description="Download " />
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
