import * as React from "react";

declare global {
  type Maybe<T> = T | null;
  type Callback = (...args: any[]) => any;
  type ReactNode =
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | boolean
    | null
    | undefined;
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

export enum ViewTypes {
  VOLS,
  VOLS_TYPE,
  VOL_INFO,
  SINGLES,
  SINGLE_INFO,
  ARTICLES,
  ARTICLE_INFO,
  USER,
  SEARCH
}

export enum PlayingTypes {
  VOL,
  SINGLE,
  ARTICLE,
  COLLECTION_TRACK
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

export enum TrackType {
  VOL_TRACK = 'VOL_TRACK',
  SINGLE = 'SINGLE',
  ARTICLE_TRACK = 'ARTICLE_TRACK'
}
interface ITrack {
  type: TrackType;
  id: number;
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  lyric?: string;
}
type JTrack = Readonly<ITrack>;

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
  tracks: Maybe<VolTrack[]>;
}
export type VolInfo = Readonly<IVolInfo>;

interface IVolTrack extends JTrack {
  volId: number;
  color: string;
}
export type VolTrack = Readonly<IVolTrack>;

interface ISingle extends JTrack {
  fromId: number,
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
  tracks: Maybe<ArticleTrack[]>;
}
export type ArticleInfo = Readonly<IArticleInfo>;

interface IArticleTrack extends JTrack {
  articleId: number;
  color: string;
}
export type ArticleTrack = Readonly<IArticleTrack>;

export type Track = VolTrack | ArticleTrack | Single;

export interface ElementPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface UserData {
  info: UserInfo;
  settings: UserSettings;
  collections: UserCollections;
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

export enum SearchViewTypes {
  VOLS,
  TRACKS,
  ARTICLES
}
