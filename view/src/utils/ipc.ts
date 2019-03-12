import {
  VolInfo,
  Single,
  ArticleInfo,
  UserInfo,
  UserCollections,
  UserSettings,
  ArticleTrack,
  VolTrack
} from "../@types";

declare global {
  interface Window {
    require: (p: string) => any;
  }

  interface IpcObject {
    request: {
      requestVols(startVol: number): Promise<VolInfo[]>;
      requestSingles(startDate: number): Promise<Single[]>;
      requestArticles(startId: number): Promise<ArticleInfo[]>;
    };
    db: {
      vol: {
        count(query?: object): Promise<number>;
        getIds(query?: object): Promise<number[]>;
        getByIds(ids: number[], projectionKeys?: (keyof VolInfo)[]): Promise<VolInfo[]>;
      }
    };
  }
}

let ipc: Maybe<IpcObject> = null;

function getIPC(): IpcObject {
  if (ipc) {
    return ipc;
  }
  const electron = window.require("electron");
  const { remote } = electron;
  ipc = remote.getGlobal("ipc") as IpcObject;
  return ipc;
}

export { getIPC };
