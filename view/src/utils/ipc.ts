
declare global {
    interface Window {
        require: (p: string) => any;
    }
}

const electron = window.require("electron");
const { remote } = electron;
const ipc = remote.getGlobal("ipc");

export {
  ipc
}
