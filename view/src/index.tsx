import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

import './styles/index.scss';
import './types/react-app-env';
import './types/images';


ReactDOM.render(
    <App />,
    document.getElementById("root") as HTMLElement
);
