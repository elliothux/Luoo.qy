import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./store";
import { App } from "./App";
import "./db/vol";

import "./styles/index.scss";
import "./types/images.d.ts";

function init() {
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
}

const boot = document.querySelector('#boot-screen') as HTMLDivElement;
boot.style.display = 'none';
// init();
