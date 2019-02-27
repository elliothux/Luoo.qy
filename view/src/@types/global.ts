export type ElementPositionValue = number;

export interface ElementPosition {
  top: ElementPositionValue;
  right: ElementPositionValue;
  bottom: ElementPositionValue;
  left: ElementPositionValue;
}

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

export interface Track {
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  lyric?: string;
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
  tracks: VolTrack[];
}

export interface VolTrack extends Track {
  id: number;
  vol: number;
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
  tracks: ArticleTrack[];
}

export interface ArticleTrack extends Track {
  id: number;
  articleId: number;
  color: string;
}
