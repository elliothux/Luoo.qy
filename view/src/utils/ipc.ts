import { ArticleInfo, Single, VolInfo } from "../types";

declare global {
  interface Window {
    require: (p: string) => any;
  }

  interface RetData<T> {
    code: number;
    msg: string;
    data: T;
  }

  interface IpcObject {
    requestVols: (startVol: number) => Promise<RetData<VolInfo[]>>;
    requestSingles: (startDate: number) => Promise<RetData<Single[]>>;
    requestArticles: (startId: number) => Promise<RetData<ArticleInfo[]>>;
    // todo
    db: any;
  }
}

function getIPC(): Promise<IpcObject> {
  const electron = window.require("electron");
  const { remote } = electron;
  return remote.getGlobal("ipc");
}

export { getIPC };
