import React from "react";
import { hydrate, render } from "react-dom";
import "./styles/styles.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";

ReactGA.initialize("UA-143331340-1");

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

serviceWorker.unregister();
