import React, {Component} from "../../../_snowpack/pkg/react.js";
import "./Navbar.css.proxy.js";
class Navbar extends Component {
  render() {
    return /* @__PURE__ */ React.createElement("navbar", null, /* @__PURE__ */ React.createElement("h1", {
      className: "logo"
    }, "v2g"), /* @__PURE__ */ React.createElement("div", {
      className: "links"
    }, /* @__PURE__ */ React.createElement("a", {
      href: "#how-it-works"
    }, "How it works"), /* @__PURE__ */ React.createElement("a", {
      href: "#get-started"
    }, "Get started")), /* @__PURE__ */ React.createElement("a", {
      className: "contact",
      href: "#footer"
    }, "Get in Touch"));
  }
}
export default Navbar;
