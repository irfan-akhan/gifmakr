import React, {Component} from "../../../_snowpack/pkg/react.js";
import "./Details.css.proxy.js";
class Details extends Component {
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "details card"
    }, /* @__PURE__ */ React.createElement("h1", {
      className: "title"
    }, this.props.title), /* @__PURE__ */ React.createElement("p", {
      className: "description"
    }, this.props.description), /* @__PURE__ */ React.createElement("img", {
      src: this.props.imgSrc,
      alt: "giff"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "arrow"
    }, this.props.arrow));
  }
}
export default Details;
