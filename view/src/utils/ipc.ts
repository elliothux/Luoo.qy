import { ArticleInfo, Single, VolInfo } from "../types";
import {
  getArticleFromTrack,
  getArticles,
  getLatestArticle,
  saveArticle,
  saveArticles
} from "../../../app/db/article";

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
    // Request
    requestVols: (startVol: number) => Promise<RetData<VolInfo[]>>;
    requestSingles: (startDate: number) => Promise<RetData<Single[]>>;
    requestArticles: (startId: number) => Promise<RetData<ArticleInfo[]>>;
    // Vols
    saveVol: (vol: VolInfo) => Promise<VolInfo>;
    saveVols: (vol: VolInfo[]) => Promise<VolInfo[]>;
    getVols: () => Promise<VolInfo[]>;
    getLatestVol: () => Promise<VolInfo>;
    getVolFromTrack: (trackId: number) => Promise<VolInfo | null>;
    // Single
    saveSingle: (single: Single) => Promise<Single>;
    saveSingles: (singles: Single[]) => Promise<Single[]>;
    getSingles: () => Promise<Single[]>;
    getLatestSingle: () => Promise<Single>;
    // Article
    saveArticle: (article: ArticleInfo) => Promise<ArticleInfo>;
    saveArticles: (articles: ArticleInfo[]) => Promise<ArticleInfo[]>;
    getArticles: () => Promise<ArticleInfo[]>;
    getLatestArticle: () => Promise<ArticleInfo>;
    getArticleFromTrack: (trackId: number) => Promise<ArticleInfo | null>;
  }
}

function getIPC(): Promise<IpcObject> {
  const electron = window.require("electron");
  const { remote } = electron;
  return remote.getGlobal("ipc");
}

export { getIPC };
