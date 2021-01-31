// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "video {\r\n  border-radius: 10px;\r\n  height: 360px;\r\n  box-shadow: 1px 10px 10px 1px rgba(0, 0, 0, 0.223);\r\n  outline: none;\r\n  margin-bottom: 1em;\r\n}\r\n@media only screen and (max-width: 320px) {\r\n  video {\r\n    height: 150px;\r\n  }\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}