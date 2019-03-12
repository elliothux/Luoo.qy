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
      requestVols: (startVol: number) => Promise<VolInfo[]>;
      requestSingles: (startDate: number) => Promise<Single[]>;
      requestArticles: (startId: number) => Promise<ArticleInfo[]>;
    };
    user: {
      login: (mail: string, password: string) => Promise<UserInfo>;
      logout: () => void;
      getUserInfo: (key: keyof UserInfo) => Maybe<string>;
      getUserInfos: () => UserInfo;
      setUserInfo: (key: keyof UserInfo, value: string) => void;
      getUserSetting: (key: keyof UserSettings) => boolean;
      setUserSetting: (key: keyof UserSettings, value: boolean) => void;
      getUserCollections: () => UserCollections;
      fetchAndSaveLikedVols: () => Promise<number[]>;
      fetchAndSaveLikedTracks: () => Promise<number[]>;
      fetchAndSaveLikedArticles: () => Promise<number[]>;
    };
    db: {
      vol: {
        getIds: (query?: object) => Promise<number[]>
        getByIds: (ids: number[], projectionKeys?: (keyof VolInfo)[]) => Promise<VolInfo[]>
        // saveVol: (vol: VolInfo) => Promise<VolInfo>;
        // saveVols: (vols: VolInfo[]) => Promise<VolInfo[]>;
        // getVols: () => Promise<VolInfo[]>;
        // getLatestVol: () => Promise<VolInfo>;
        // getVolByTrackId: (trackId: number) => Promise<Maybe<VolInfo>>;
        // getVolById: (id: number) => Promise<Maybe<VolInfo>>;
        // getLikedVols: () => Promise<VolInfo[]>;
        // getLikedVolTracks: () => Promise<VolTrack[]>;
      };
      single: {
        saveSingle: (single: Single) => Promise<Single>;
        saveSingles: (singles: Single[]) => Promise<Single[]>;
        getSingles: () => Promise<Single[]>;
        getLatestSingle: () => Promise<Single>;
        getLikedSingles: () => Promise<Single[]>;
      };
      article: {
        saveArticle: (article: ArticleInfo) => Promise<ArticleInfo>;
        saveArticles: (articles: ArticleInfo[]) => Promise<ArticleInfo[]>;
        getArticles: () => Promise<ArticleInfo[]>;
        getLatestArticle: () => Promise<ArticleInfo>;
        getArticleByTrackId: (trackId: number) => Promise<Maybe<ArticleInfo>>;
        getLikedArticles: () => Promise<ArticleInfo[]>;
        getLikedArticleTracks: () => Promise<ArticleTrack[]>;
      };
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
