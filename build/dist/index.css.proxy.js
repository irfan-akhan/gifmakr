// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\n  margin: 0;\n  box-sizing: border-box;\n  font-family: 'Nunito', sans-serif;\n  background-color: #fff;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  scroll-behavior: smooth;\n}\n::-moz-selection {\n  color: #000000;\n  background: #eb7c5e;\n}\n\n::selection {\n  color: #000000;\n  background: #eb7c5e;\n}\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}