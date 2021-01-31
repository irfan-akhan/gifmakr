// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".details {\r\n  background-color: #ffffffe2;\r\n  position: relative;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n}\r\n.arrow {\r\n  display: block;\r\n  position: absolute;\r\n  top: 40%;\r\n  right: -3%;\r\n  font-size: 30px;\r\n  color: #58468c;\r\n}\r\n.card {\r\n  border-radius: 10px;\r\n  margin-right: 30px;\r\n  box-shadow: 2px 3px 20px 0px #0000003a;\r\n}\r\n.card:last-of-type {\r\n  margin-right: 0;\r\n}\r\n.title {\r\n  text-transform: uppercase;\r\n  color: #f37c5f;\r\n  font-weight: bold;\r\n}\r\n\r\n.description {\r\n  color: #58468c;\r\n  font-size: 20px;\r\n  text-transform: capitalize;\r\n  margin-bottom: 20px;\r\n}\r\n.details img {\r\n  width: 90%;\r\n  border-radius: 10px;\r\n  box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, 0.123);\r\n}\r\n/* Media queries */\r\n@media screen and (max-width: 600px) {\r\n  .arrow {\r\n    display: none;\r\n  }\r\n  .card {\r\n    margin-right: 0;\r\n  }\r\n}\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}