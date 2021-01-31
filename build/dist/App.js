import React from "../_snowpack/pkg/react.js";
import {createFFmpeg, fetchFile} from "../_snowpack/pkg/@ffmpeg/ffmpeg.js";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Video from "./components/video/Video.js";
import "./App.css.proxy.js";
import Details from "./components/details/Details.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
      video: null,
      giff: null,
      start: 0,
      duration: 1
    };
    this.ffmpeg = createFFmpeg({log: true, videoInput: null});
  }
  load = async () => {
    await this.ffmpeg.load();
    this.setState({load: true});
  };
  componentDidMount() {
    this.load();
  }
  videoChangeHandler = (e) => {
    const file = e.target.files[0];
    this.setState({video: file});
  };
  inputStartChangeHandler = (e) => {
    this.setState({start: e.target.value});
  };
  inputDurationChangeHandler = (e) => {
    this.setState({duration: e.target.value});
  };
  downloadGiffHandler = (address) => {
    fetch(address).then((response) => {
      response.arrayBuffer().then(function(buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
      });
    }).catch((err) => {
      console.error(err);
    });
  };
  generateGiffHandler = async (e) => {
    const loader = document.querySelector(".loader");
    this.ffmpeg.FS("writeFile", "buffer.mp4", await fetchFile(this.state.video));
    console.log(loader);
    loader.style.display = "block";
    await this.ffmpeg.run("-ss", `${this.state.start}`, "-t", `${this.state.duration}`, "-i", "buffer.mp4", "-r", "15", "-f", "gif", "output.giff");
    const result = this.ffmpeg.FS("readFile", "output.giff");
    loader.style.display = "none";
    const url = URL.createObjectURL(new Blob([result.buffer], {type: "img/giff"}));
    this.setState({giff: url});
    console.log("in giff", url);
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "container"
    }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("div", {
      className: "main_content"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "main_heading"
    }, /* @__PURE__ */ React.createElement("h1", null, "The v2g giff generator is a free online tool for creating giff's from video.")))), /* @__PURE__ */ React.createElement("section", {
      id: "how-it-works",
      className: "how-it-works"
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "heading"
    }, "How it works"), /* @__PURE__ */ React.createElement("p", {
      className: "text"
    }, "Just follw simple 3 step process described below to convert your video file into a giff."), /* @__PURE__ */ React.createElement("div", {
      className: "steps"
    }, /* @__PURE__ */ React.createElement(Details, {
      title: "Upload",
      description: "Upload a video file ",
      arrow: "\u2192",
      imgSrc: "https://i.ibb.co/WBHVghD/input-video.gif"
    }), /* @__PURE__ */ React.createElement(Details, {
      title: "Convert",
      description: "enter details and convert video into a giff file ",
      arrow: "\u2192",
      imgSrc: "https://i.ibb.co/zNktqph/giff-generate.gif"
    }), /* @__PURE__ */ React.createElement(Details, {
      title: "Download",
      description: "Download your giff and share ",
      imgSrc: "https://i.ibb.co/H2zFVh4/Download-gif.gif"
    }))), /* @__PURE__ */ React.createElement("main", {
      id: "get-started"
    }, /* @__PURE__ */ React.createElement("section", {
      className: "videoPlayer"
    }, this.state.video ? /* @__PURE__ */ React.createElement("div", {
      className: "controls"
    }, /* @__PURE__ */ React.createElement(Video, {
      videoSrc: this.state.video
    }), /* @__PURE__ */ React.createElement("div", {
      className: "buttonWrap"
    }, /* @__PURE__ */ React.createElement("label", {
      className: "newButton",
      htmlFor: "upload"
    }, "Upload"), /* @__PURE__ */ React.createElement("input", {
      type: "file",
      id: "upload",
      onChange: (e) => this.videoChangeHandler(e)
    })), /* @__PURE__ */ React.createElement("div", {
      className: "input-group"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "label"
    }, /* @__PURE__ */ React.createElement("label", {
      htmlFor: "start"
    }, "Statring Point"), /* @__PURE__ */ React.createElement("input", {
      placeholder: "hh:mm:ss",
      onChange: (e) => {
        this.inputStartChangeHandler(e);
      },
      type: "text",
      name: "start",
      id: "start"
    })), /* @__PURE__ */ React.createElement("div", {
      className: "label"
    }, /* @__PURE__ */ React.createElement("label", {
      htmlFor: "duration"
    }, "Total Duration "), /* @__PURE__ */ React.createElement("input", {
      placeholder: "hh:mm:ss",
      onChange: (e) => {
        this.inputDurationChangeHandler(e);
      },
      type: "text",
      name: "duration",
      id: "duration"
    }))), /* @__PURE__ */ React.createElement("button", {
      className: "button",
      onClick: (e) => {
        this.generateGiffHandler(e);
      }
    }, "Generate Giff")) : /* @__PURE__ */ React.createElement("div", {
      className: "file"
    }, /* @__PURE__ */ React.createElement("img", {
      src: "https://i.ibb.co/2hgB0s5/noun-Upload-1560879-removebg-preview.png",
      alt: "upload-img"
    }), /* @__PURE__ */ React.createElement("h2", null, "Select a video file"), /* @__PURE__ */ React.createElement("div", {
      className: "buttonWrap"
    }, /* @__PURE__ */ React.createElement("label", {
      className: "newButton",
      htmlFor: "upload"
    }, "Upload"), /* @__PURE__ */ React.createElement("input", {
      type: "file",
      id: "upload",
      onChange: (e) => this.videoChangeHandler(e)
    })))), this.state.giff ? /* @__PURE__ */ React.createElement("section", {
      className: "giffElement"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "giffDownload"
    }, /* @__PURE__ */ React.createElement("img", {
      src: this.state.giff,
      alt: "giff"
    }), /* @__PURE__ */ React.createElement("button", {
      className: "button",
      onClick: (e) => {
        this.downloadGiffHandler(this.state.giff);
      }
    }, "Download Giff"))) : ""), /* @__PURE__ */ React.createElement("div", {
      className: "loader"
    }), /* @__PURE__ */ React.createElement(Footer, null));
  }
}
export default App;
