interface Track {
  name: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
  lyric?: string;
}

interface RetData<T> {
  code: number;
  msg: string;
  data: T;
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

interface ArticleInfo {
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

interface VolTrackMap {
  id: number;
  vol: number;
  volId: number;
}

interface ArticleTrackMap {
  id: number;
  articleId: number;
}

export interface UserInfo {
  mail: string;
  password: string;
  id: number;
  name: string;
  avatar: string;
}
