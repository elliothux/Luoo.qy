import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./store";
import { App } from "./App";

import "./styles/index.scss";
import "./types/images.d.ts";

store
  .init()
  .then(() => {
      const root = document.getElementById("root") as HTMLElement;
      const boot = document.querySelector('#boot-screen') as HTMLDivElement;

      ReactDOM.render(<App />, root, () => {
          boot.className = 'hide';
          setTimeout(() => {
              boot.style.display = 'none';
          }, 1600);
      });
  })
  .catch(e => {
    console.error(e);
  });
