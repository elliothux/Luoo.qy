import {
  VolInfo,
  Single,
  ArticleInfo,
} from "../@types";


declare global {
  interface Window {
    require: (p: string) => any;
  }

  interface IpcObject {
    // Request
    requestVols: (startVol: number) => Promise<VolInfo[]>;
    requestSingles: (startDate: number) => Promise<Single[]>;
    requestArticles: (startId: number) => Promise<ArticleInfo[]>;
    // Vols
    saveVol: (vol: VolInfo) => Promise<VolInfo>;
    saveVols: (vols: VolInfo[]) => Promise<VolInfo[]>;
    getVols: () => Promise<VolInfo[]>;
    getLatestVol: () => Promise<VolInfo>;
    getVolByTrackId: (trackId: number) => Promise<VolInfo | null>;
    getVolById: (id: number) => Promise<VolInfo | null>;
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
    getArticleByTrackId: (trackId: number) => Promise<ArticleInfo | null>;
  }
}

function getIPC(): Promise<IpcObject> {
  const electron = window.require("electron");
  const { remote } = electron;
  return remote.getGlobal("ipc");
}

export { getIPC };
