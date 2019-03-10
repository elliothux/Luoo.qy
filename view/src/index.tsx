import * as React from "react";
import * as ReactDOM from "react-dom";
import {store} from "./store";
import {App} from "./App";

import "./styles/index.scss";
import {ViewTypes} from "./@types";

function init() {
  store
    .init()
    .then(() => {
      const root = document.getElementById("root") as HTMLElement;
      const boot = document.querySelector("#boot-screen") as HTMLDivElement;

      ReactDOM.render(<App />, root, () => {
          setTimeout(() => {
              store.changeView(ViewTypes.USER)
          }, 2200);
        setTimeout(() => {
          boot.className = "hide";
        }, 500);
        setTimeout(() => {
          boot.style.display = "none";
        }, 1500 + 500);
      });
    })
    .catch(e => {
      console.error(e);
    });
}

// const boot = document.querySelector("#boot-screen") as HTMLDivElement;
// boot.style.display = "none";
init();
