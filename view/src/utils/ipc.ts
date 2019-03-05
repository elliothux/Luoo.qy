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
      setUserInfo: (key: keyof UserInfo, value: string) => void;
      getUserSetting: (key: keyof UserSettings) => boolean;
      setUserSetting: (key: keyof UserSettings, value: boolean) => void;
      getUserCollections: () => UserCollections;
      fetchAndSaveLikedVols: () => Promise<void>;
      fetchAndSaveLikedTracks: () => Promise<void>;
      fetchAndSaveLikedArticles: () => Promise<void>;
    };
    db: {
      vol: {
        saveVol: (vol: VolInfo) => Promise<VolInfo>;
        saveVols: (vols: VolInfo[]) => Promise<VolInfo[]>;
        getVols: () => Promise<VolInfo[]>;
        getLatestVol: () => Promise<VolInfo>;
        getVolByTrackId: (trackId: number) => Promise<Maybe<VolInfo>>;
        getVolById: (id: number) => Promise<Maybe<VolInfo>>;
        getLikedVols: () => Promise<VolInfo[]>;
        getLikedVolTracks: () => Promise<VolTrack[]>;
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

function getIPC(): Promise<IpcObject> {
  const electron = window.require("electron");
  const { remote } = electron;
  return remote.getGlobal("ipc");
}

export { getIPC };
