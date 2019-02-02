import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./store";
import { App } from "./App";

import "./styles/common.scss";
import "./styles/index.scss";
import "./styles/font.scss";
import "./types/images.d.ts";

store.fetchVols().then(() => {
  ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
}).catch(console.error);
