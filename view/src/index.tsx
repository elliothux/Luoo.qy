import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./store";
import { App } from "./App";

import "./styles/index.scss";
import "./types/images.d.ts";

store
  .init()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
  })
  .catch(e => {
    console.error(e);
  });
