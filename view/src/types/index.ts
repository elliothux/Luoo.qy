export enum ViewTypes {
  VOLS,
  VOL_INFO,
  SINGLES,
  PLAYING
}

export enum PlayingTypes {
  VOL,
  SINGLE
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

export interface VolTrack {
  id: number;
  vol: number;
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  color: string;
}
