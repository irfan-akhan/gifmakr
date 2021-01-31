import React, {Component} from "../../../_snowpack/pkg/react.js";
import "./Video.css.proxy.js";
class Video extends Component {
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "videoElement"
    }, /* @__PURE__ */ React.createElement("video", {
      width: "100%",
      src: URL.createObjectURL(this.props.videoSrc),
      controls: true
    }));
  }
}
export default Video;
