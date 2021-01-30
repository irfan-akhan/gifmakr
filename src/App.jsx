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
            <div className="main_heading">
              <h1>
                The v2g giff generator is a free online tool for creating giff's
                from video.
              </h1>
            </div>
          </div>
        </header>
        <section id="how-it-works" className="how-it-works">
          <h1 className="heading">How it works</h1>
          <p className="text">
            Just follw simple 3 step process described below to convert your
            video file into a giff.
          </p>
          <div className="steps">
            <Details
              title="Upload"
              description="Upload a video file "
              arrow="&#8594;"
              imgSrc="https://i.ibb.co/WBHVghD/input-video.gif"
            />
            <Details
              title="Convert"
              description="enter details and convert video into a giff file "
              arrow="&#8594;"
              imgSrc="https://i.ibb.co/zNktqph/giff-generate.gif"
            />
            <Details
              title="Download"
              description="Download your giff and share "
              imgSrc="https://i.ibb.co/H2zFVh4/Download-gif.gif"
            />
          </div>
        </section>
        <main id="get-started">
          <section className="videoPlayer">
            {this.state.video ? (
              <div className="controls">
                <Video videoSrc={this.state.video} />
                <div className="input-group">
                  <div className="label">
                    <label htmlFor="start">Statring Point</label>
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
                    <label htmlFor="duration">Total Duration </label>
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
            <section className="giffElement">
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
            </section>
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
