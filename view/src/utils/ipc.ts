import {
  FindOptions,
  VolInfo,
  Single,
  ArticleInfo,
  ArticleTrack,
  VolTrack,
  TrackType,
  UserInfo,
  UserSettings
} from "../types";
import {getRemote} from "./index";

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
    user: {
      login(mail: string, password: string): Promise<UserInfo>;
      logout(): void;
      getUserInfo(): UserInfo;
      setUserSetting(
        key: keyof UserSettings,
        value: boolean | string
      ): UserSettings;
      getUserSettings(): UserSettings;
      getUserLikedVolIds(): number[];
      getUserLikedArticleIds(): number[];
      getUserLikedTrackIds(): number[];
      fetchAndSaveLikedVols(): Promise<number[]>;
      fetchAndSaveLikedTracks(): Promise<number[]>;
      fetchAndSaveLikedArticles(): Promise<number[]>;
      likeVol(id: ID): Promise<ID[]>;
      likeArticle(id: ID): Promise<ID[]>;
      likeTrack(type: TrackType, id: ID, fromID: ID): Promise<ID[]>;
      unlikeVol(id: ID): Promise<ID[]>;
      unlikeArticle(id: ID): Promise<ID[]>;
      unlikeTrack(type: TrackType, id: ID, fromID: ID): Promise<ID[]>;
    };
    db: {
      vol: {
        count(query?: object): Promise<number>;
        findOne<T = VolInfo>(query: object): Promise<Maybe<T>>;
        find<T = VolInfo>(options: FindOptions): Promise<T[]>;
        insert(items: VolInfo[]): Promise<VolInfo[]>;
        latestID: () => Promise<ID>;
        search<T = VolInfo>(text: string, projection: object): Promise<T[]>;
      };
      volTrack: {
        findOne(query: object): Promise<Maybe<VolTrack>>;
        find<T = VolTrack>(options: FindOptions): Promise<T[]>;
        search<T = VolTrack>(text: string, projection: object): Promise<T[]>;
      };
      single: {
        count(query?: object): Promise<number>;
        findOne(query: object): Promise<Maybe<Single>>;
        find<T = Single>(options: FindOptions): Promise<T[]>;
        insert(items: Single[]): Promise<Single[]>;
        latestID: () => Promise<ID>;
        search<T = Single>(text: string, projection: object): Promise<T[]>;
      };
      article: {
        count(query?: object): Promise<number>;
        findOne<T = ArticleInfo>(query: object): Promise<Maybe<T>>;
        find<T = ArticleInfo>(options: FindOptions): Promise<T[]>;
        insert(items: ArticleInfo[]): Promise<ArticleInfo[]>;
        latestID: () => Promise<ID>;
        search<T = ArticleInfo>(text: string, projection: object): Promise<T[]>;
      };
      articleTrack: {
        findOne(query: object): Promise<Maybe<ArticleTrack>>;
        find<T = ArticleTrack>(options: FindOptions): Promise<T[]>;
        search<T = ArticleTrack>(
          text: string,
          projection: object
        ): Promise<T[]>;
      };
    };
  }
}

let ipc: Maybe<IpcObject> = null;

const ipcUtils = {
  getTrackIdsByVolId: async (id: ID): Promise<ID[]> => {
    if (!ipc) {
      return [];
    }

    return (await ipc.db.volTrack.find<VolTrack>({
      query: { volId: id },
      projection: { id: 1 },
      sort: { id: -1 }
    })).map(i => i.id);
  },
  getTrackIdsByArticleId: async (id: ID): Promise<ID[]> => {
    if (!ipc) {
      return [];
    }

    return (await ipc.db.articleTrack.find<VolTrack>({
      query: { articleId: id },
      projection: { id: 1 },
      sort: { id: -1 }
    })).map(i => i.id);
  },
  getSingleIds: async (): Promise<ID[]> => {
    if (!ipc) {
      return [];
    }

    return (await ipc.db.single.find<Single>({
      projection: { id: 1 },
      sort: { id: -1 }
    })).map(i => i.id);
  }
};

function getIPC(): IpcObject {
  if (ipc) {
    return ipc;
  }
  const remote = getRemote();
  ipc = remote.getGlobal("ipc") as IpcObject;
  return ipc;
}

export { getIPC, ipcUtils };
