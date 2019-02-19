import { action, computed, observable } from "mobx";
import { Howl, Howler } from "howler";
import { volStore } from "./vol";
import {
  ArticleInfo,
  ArticleTrack,
  PlayingMode,
  PlayingStatus,
  PlayingTypes,
  Single,
  Track,
  VolInfo,
  VolTrack
} from "../types";
import { singleStore } from "./single";
import { articleStore } from "./article";

let ipc: IpcObject;

class PlayerStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;
  };

  /*
    * @desc Vol
     */
  @observable
  private playingVolId: number = volStore.allVols[0].id;

  @observable
  private playingVolTrackIndex: number = 0;

  @computed
  private get playingVol(): VolInfo {
    return volStore.allVols.find(
      vol => vol.id === this.playingVolId
    ) as VolInfo;
  }

  @computed
  private get playingVolTrack(): VolTrack {
    const { tracks } = this.playingVol;
    return tracks[this.playingVolTrackIndex];
  }

  public isVolPlaying = (volId: number): boolean => {
    return (
      this.playingStatus === PlayingStatus.PLAYING &&
      this.playingType === PlayingTypes.VOL &&
      this.playingVolId === volId
    );
  };

  public isVolTrackPlaying = (volId: number, trackIndex: number): boolean => {
    return this.isVolPlaying(volId) && this.playingVolTrackIndex === trackIndex;
  };

  /*
    * @desc Single
     */
  @observable
  private playingSingleId: number = singleStore.singles[0].id;

  @computed
  private get playingSingle(): Single {
    return singleStore.singles.find(
      single => single.id === this.playingSingleId
    ) as Single;
  }

  public isSinglePlaying = (singleId: number): boolean => {
    return (
      this.playingStatus === PlayingStatus.PLAYING &&
      this.playingType === PlayingTypes.SINGLE &&
      this.playingSingleId === singleId
    );
  };
  /*
    * @desc Article
     */
  @observable
  private playingArticleId: number = articleStore.articles[0].id;

  @observable
  private playingArticleTrackIndex: number = 0;

  @computed
  private get playingArticle(): ArticleInfo {
    return articleStore.articles.find(
      article => article.id === this.playingArticleId
    ) as ArticleInfo;
  }

  @computed
  private get playingArticleTrack(): ArticleTrack {
    return this.playingArticle.tracks[this.playingArticleTrackIndex];
  }

  public isArticlePlaying = (articleId: number): boolean => {
    return (
      this.playingStatus === PlayingStatus.PLAYING &&
      this.playingType === PlayingTypes.ARTICLE &&
      this.playingArticleId === articleId
    );
  };

  public isArticleTrackPlaying = (
    articleId: number,
    articleTrackIndex: number
  ): boolean => {
    return (
      this.isArticlePlaying(articleId) &&
      this.playingArticleTrackIndex === articleTrackIndex
    );
  };
  /*
    * @desc Playing
     */
  @computed
  public get playingInfo(): Track {
    switch (this.playingType) {
      case PlayingTypes.VOL:
        return this.playingVolTrack;
      case PlayingTypes.SINGLE:
        return this.playingSingle;
      case PlayingTypes.ARTICLE:
        return this.playingArticleTrack;
    }
  }

  @observable
  public playingStatus: PlayingStatus = PlayingStatus.STOP;

  @observable
  public playingMode: PlayingMode = PlayingMode.ORDER;

  @observable
  public playingType: PlayingTypes = PlayingTypes.VOL;

  /*
    * @desc Duration
     */
  @observable
  private playedTime: number = 33;

  @observable
  private totalTime: number = 100;

  @computed
  public get formatedPlayedTime() {
    return formatPlayingTime(this.playedTime);
  }

  @computed
  public get formatedTotalTime() {
    return formatPlayingTime(this.totalTime);
  }

  @computed
  public get playingProgress(): number {
    return Math.ceil((this.playedTime / this.totalTime) * 100);
  }

  /*
    * @desc Control
     */
  @action
  public playVolTrack = (volId: number, trackIndex: number = 0) => {
    this.playingVolId = volId;
    this.playingVolTrackIndex = trackIndex;
    this.playingType = PlayingTypes.VOL;
    this.playingStatus = PlayingStatus.PLAYING;
  };

  @action
  public playSingle = (singleId: number) => {
    this.playingSingleId = singleId;
    this.playingType = PlayingTypes.SINGLE;
    this.playingStatus = PlayingStatus.PLAYING;
  };

  @action
  public play = () => {
    this.playingStatus = PlayingStatus.PLAYING;
  };

  @action
  public pause = () => {
    this.playingStatus = PlayingStatus.PAUSE;
  };

  @action
  public next = () => {
    switch (this.playingType) {
      case PlayingTypes.VOL: {
        this.nextVolTrack();
        break;
      }
      case PlayingTypes.SINGLE: {
        this.nextSingle();
        break;
      }
    }
    this.playingStatus = PlayingStatus.PLAYING;
  };

  @action
  private nextVolTrack = () => {
    const { tracks } = this.playingVol;
    if (tracks.length === 1) return;

    if (this.playingVolTrackIndex + 1 === tracks.length) {
      this.playingVolTrackIndex = 0;
    } else {
      this.playingVolTrackIndex += 1;
    }
  };

  @action
  private nextSingle = () => {
    const { singles } = singleStore;
    if (singles.length === 1) return;

    const singleIndex = singles.findIndex(
      single => single.id === this.playingSingleId
    );
    if (singleIndex + 1 === singles.length) {
      this.playingSingleId = singles[0].id;
    } else {
      this.playingSingleId = singles[singleIndex + 1].id;
    }
  };

  @action
  public pre = () => {
    switch (this.playingType) {
      case PlayingTypes.VOL: {
        this.preVolTrack();
        break;
      }
      case PlayingTypes.SINGLE: {
        this.preSingle();
        break;
      }
    }
    this.playingStatus = PlayingStatus.PLAYING;
  };

  @action
  private preVolTrack = () => {
    const { tracks } = this.playingVol;
    if (tracks.length === 1) return;

    if (this.playingVolTrackIndex === 0) {
      this.playingVolTrackIndex = tracks.length - 1;
    } else {
      this.playingVolTrackIndex -= 1;
    }
  };

  @action
  private preSingle = () => {
    const { singles } = singleStore;
    if (singles.length === 1) return;

    const singleIndex = singles.findIndex(
      single => single.id === this.playingSingleId
    );
    if (singleIndex === 0) {
      this.playingSingleId = singles[singles.length - 1].id;
    } else {
      this.playingSingleId = singles[singleIndex - 1].id;
    }
  };
}

function formatPlayingTime(time: number): string {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = time - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

const playerStore = new PlayerStore();

export { playerStore };
