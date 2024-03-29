import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { buildStore } from "./state/store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={buildStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
