export type ElementPositionValue = number;

declare global {
  interface ElementPosition {
    top: ElementPositionValue;
    right: ElementPositionValue;
    bottom: ElementPositionValue;
    left: ElementPositionValue;
  }

  enum ViewTypes {
    PLAYING,
    VOLS,
    VOLS_TYPE,
    VOL_INFO,
    SINGLES,
    SINGLE_INFO,
    ARTICLES,
    ARTICLE_INFO
  }

  enum PlayingTypes {
    VOL,
    SINGLE,
    ARTICLE
  }

  enum PlayingStatus {
    STOP,
    PLAYING,
    PAUSE,
    FETCHING
  }

  enum PlayingMode {
    ORDER,
    SHUFFLE,
    LOOP
  }

  interface Track {
    name: string;
    artist: string;
    album: string;
    cover: string;
    url: string;
    lyric?: string;
  }

  interface VolInfo {
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

  interface VolTrack extends Track {
    id: number;
    vol: number;
    color: string;
  }

  interface Single extends Track {
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

  interface ArticleTrack extends Track {
    id: number;
    articleId: number;
    color: string;
  }
}
