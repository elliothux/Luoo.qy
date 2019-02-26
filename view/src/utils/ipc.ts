import { ArticleInfo, Single, VolInfo } from "../types";

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
    getVolFromTrackId: (trackId: number) => Promise<VolInfo | null>;
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
    getArticleFromTrackId: (trackId: number) => Promise<ArticleInfo | null>;
  }
}

function getIPC(): Promise<IpcObject> {
  const electron = window.require("electron");
  const { remote } = electron;
  return remote.getGlobal("ipc");
}

export { getIPC };
