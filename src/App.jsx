import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Video from './components/video/Video';

import './App.css';
import Info from './components/info/Info';
import Details from './components/details/Details';
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
    return (
      <div className="container">
        <Navbar />
        <header>
          <div className="main_content">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <div className="main_heading">
              <h1>
                The v2g giff generator is a free online tool for creating giff's
                from video.
              </h1>
            </div>
          </div>
        </header>
        <section className="how-it-works">
          <h1 className="heading">How it works</h1>
          <p className="text">
            convert a video file into a giff. Just follw simple 3 step process
            described below
          </p>
          <div className="steps">
            <Details
              title="Upload"
              description="Upload a video file "
              arrow="&#8594;"
            />
            <Details
              title="Convert"
              description="enter details and convert video into a giff file "
              arrow="&#8594;"
            />
            <Details
              title="Download"
              description="Download giff file and share "
            />
          </div>
        </section>
        <main>
          <section className="videoPlayer">
            {this.state.video ? (
              <div className="controls">
                <Video videoSrc={this.state.video} />
                <div className="input-group">
                  <div className="label">
                    <label htmlFor="start">Statring point: </label>
                    <input
                      placeholder="hh:mm:ss"
                      onChange={(e) => {
                        this.inputStartChangeHandler(e);
                      }}
                      type="text"
                      name="start"
                      id="start"
                    />
                  </div>
                  <div className="label">
                    <label htmlFor="duration">Duration: </label>
                    <input
                      placeholder="hh:mm:ss"
                      onChange={(e) => {
                        this.inputDurationChangeHandler(e);
                      }}
                      type="text"
                      name="duration"
                      id="duration"
                    />
                  </div>
                </div>
                <button
                  className="button"
                  onClick={(e) => {
                    this.generateGiffHandler(e);
                  }}
                >
                  Generate Giff
                </button>
              </div>
            ) : (
              <div className="file">
                <img
                  src="https://i.ibb.co/2hgB0s5/noun-Upload-1560879-removebg-preview.png"
                  alt="upload-img"
                ></img>
                <h2>Select a video file</h2>
                <div className="buttonWrap">
                  <label className="newButton" htmlFor="upload">
                    Upload
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

          {this.state.giff ? (
            <div className="giffDownload">
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
            ''
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
