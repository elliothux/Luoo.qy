import { action, computed, observable } from "mobx";
import { store } from "./index";

let ipc: IpcObject;

class PlayerStore {
    @action
    init = async (IPC: IpcObject) => {
        ipc = IPC;
    };
}

const playerStore = new PlayerStore();

export { playerStore };
