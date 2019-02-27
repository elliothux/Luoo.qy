
export enum ViewTypes {
  PLAYING,
  VOLS,
  VOLS_TYPE,
  VOL_INFO,
  SINGLES,
  SINGLE_INFO,
  ARTICLES,
  ARTICLE_INFO
}

export enum PlayingTypes {
  VOL,
  SINGLE,
  ARTICLE
}

export enum PlayingStatus {
  STOP,
  PLAYING,
  PAUSE,
  FETCHING
}

export enum PlayingMode {
  ORDER,
  SHUFFLE,
  LOOP
}

interface ITrack {
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  lyric?: string;
}
export type Track = Readonly<ITrack>;

interface IVolInfo {
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
  tracks: VolTrack[];
}
export type VolInfo =  Readonly<IVolInfo>;

interface IVolTrack extends Track {
  id: number;
  vol: number;
  color: string;
}
export type VolTrack = Readonly<IVolTrack>;

interface ISingle extends Track {
  id: number;
  desc: string;
  date: number;
  recommender: string;
  color: string;
}
export type Single = Readonly<ISingle>;

interface IArticleInfo {
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
  tracks: ArticleTrack[];
}
export type ArticleInfo = Readonly<IArticleInfo>;

interface IArticleTrack extends Track {
  id: number;
  articleId: number;
  color: string;
}
export type ArticleTrack = Readonly<IArticleTrack>;

export interface ElementPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
