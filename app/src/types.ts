declare global {
  type Maybe<T> = T | null;
  type Callback = (...args: any[]) => any;
  type ID = number;
  type Cover = string;
  type Title = string;
  type Name = string;
  type Artist = string;
  type Album = string;
  type Link = string;
  type Tag = string;
  type Color = string;
}

export interface FindOptions {
  query?: object;
  projection?: object;
  skip?: number;
  limit?: number;
  sort?: object;
}

export enum TrackType {
  VOL_TRACK = 'VOL_TRACK',
  SINGLE = 'VOL_TRACK',
  ARTICLE_TRACK = 'ARTICLE_TRACK'
}
export interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  lyric?: string;
}

export interface RetData<T> {
  code: number;
  msg: string;
  data: T;
}

export interface VolInfo {
  id: number;
  vol: number;
  title: string;
  link: string;
  cover: string;
  color: string;
  author: string;
  authorAvatar: string;
  date: string;
  desc: string;
  tags: string[];
  similarVols: number[];
  tracks?: VolTrack[];
}

export interface VolTrack extends Track {
  volId: number;
  color: string;
}

export interface Single extends Track {
  fromId: number,
  desc: string;
  date: number;
  recommender: string;
  color: string;
}

export interface ArticleInfo {
  id: number;
  title: string;
  cover: string;
  intro: string;
  color: string;
  metaInfo: string;
  date: string;
  url: string;
  desc: string;
  author: string;
  authorAvatar: string;
  tracks?: ArticleTrack[];
}

export interface ArticleTrack extends Track {
  articleId: number;
  color: string;
}

export interface UserData {
  info: UserInfo,
  settings: UserSettings,
  collections: UserCollections
}

export interface UserInfo {
  mail: Maybe<string>;
  password: Maybe<string>;
  id: Maybe<number>;
  name: Maybe<string>;
  avatar: Maybe<string>;
  session: Maybe<string>;
  lult: Maybe<string>;
}

export interface UserSettings {
  autoUpdate: boolean;
  pushNotifications: boolean;
  downloadFolder: string;
}

export interface UserCollections {
  tracks: number[];
  vols: number[];
  articles: number[];
}
