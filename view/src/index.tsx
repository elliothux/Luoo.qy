import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

import "./styles/index.scss";
import "./styles/font.scss";
import "./types/images.d.ts";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
