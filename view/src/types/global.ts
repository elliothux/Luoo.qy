import * as React from 'react';

declare global {
  // type Maybe<T> = T | null;
  type Callback = (...args: any[]) => any;
  type ReactNode = React.ReactChild | React.ReactFragment | React.ReactPortal | boolean | null | undefined;
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
  PLAYING,
  VOLS,
  VOLS_TYPE,
  VOL_INFO,
  SINGLES,
  SINGLE_INFO,
  ARTICLES,
  ARTICLE_INFO,
  USER
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
  id: number;
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
  tracks: Maybe<VolTrack[]>;
}
export type VolInfo = Readonly<IVolInfo>;

interface IVolTrack extends Track {
  volId: number;
  color: string;
}
export type VolTrack = Readonly<IVolTrack>;

interface ISingle extends Track {
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

interface IArticleTrack extends Track {
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
  autoSync: boolean;
}

export interface UserCollections {
  tracks: number[];
  vols: number[];
  articles: number[];
}
