import {VolInfo} from "../types";

declare global {
    interface Window {
        require: (p: string) => any;
    }

    interface RetData<T> {
        code: number,
        msg: string,
        data: T,
    }

    interface IpcObject {
        requestVols: (start: number, end: number) => Promise<RetData<VolInfo[]>>,
        // todo
        db: any
    }
}


function getIPC(): Promise<IpcObject> {
    const electron = window.require("electron");
    const { remote } = electron;
    return remote.getGlobal("ipc");
}

export {
  getIPC
}
