import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import {BackProvider} from "./components/Container/Context"

ReactDOM.render(
  <React.StrictMode>
    <BackProvider>
      <App />
    </BackProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
