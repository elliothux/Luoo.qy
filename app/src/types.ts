declare global {
  type Maybe<T> = T | null;
}

export interface FindOptions {
  query?: object;
  projection?: object;
  skip?: number;
  limit?: number;
  sort?: object;
}

export interface Track {
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
  id: number;
  volId: number;
  color: string;
}

export interface Single extends Track {
  id: number;
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
  id: number;
  articleId: number;
  color: string;
}

export interface VolTrackMap {
  id: number;
  vol: number;
  volId: number;
}

export interface ArticleTrackMap {
  id: number;
  articleId: number;
}

export interface UserInfo {
  mail: Maybe<string>;
  password: Maybe<string>;
  id: Maybe<number>;
  name: Maybe<string>;
  avatar: Maybe<string>;
  session: Maybe<string>;
  lult: Maybe<string>;
  settings: UserSettings;
  collections: UserCollections;
}

export interface UserSettings {
  autoUpdate: boolean;
  autoSync: boolean;
}

export interface UserCollections {
  tracks: number[];
  vols: number[];
  articles: number[];
}
