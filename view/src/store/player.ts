import { action, computed, observable } from "mobx";
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
import { formatPlayingTime, LyricParser } from "../utils";
import { LrcLine } from "../utils/lyric-parser";
import { singleStore } from "./single";
import { articleStore } from "./article";

let ipc: IpcObject;
let audio: HTMLAudioElement;

class PlayerStore {
  @action
  public init = async (IPC: IpcObject) => {
    ipc = IPC;
    this.initAudio();
  };

  @action
  private initAudio = () => {
    audio = new Audio(this.playingInfo.url);
    audio.addEventListener("canplay", () => {
      if (
        this.playingStatus === PlayingStatus.PLAYING ||
        this.playingStatus === PlayingStatus.FETCHING
      ) {
        return audio.play();
      }
    });
    audio.addEventListener("durationchange", () => {
      this.setTotalTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      this.setPlayedTime(audio.currentTime);
    });
    audio.addEventListener("ended", () => {
      this.next();
    });
    audio.load();
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
  private playedTime: number = 0;

  @observable
  private totalTime: number = 0;

  @action
  private setPlayedTime = (time: number) => {
    this.playedTime = time;
    this.changeCurrentLyricIndex();
  };

  @action
  private setTotalTime = (time: number) => {
    this.totalTime = time;
  };

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
  private changeAudio = (src: string) => {
    if (src === audio.src) {
      return;
    }
    audio.pause();
    audio.src = src;
    audio.load();
    return audio.play();
  };

  @action
  private updatePlayingAudio = () => {
    const { url, lyric } = this.playingInfo;
    this.currentLyricIndex = 0;
    if (lyric) {
      const lrc = new LyricParser(lyric);
      this.lyrics = lrc.getLyrics();
    } else {
      this.lyrics = null;
    }
    return this.changeAudio(url);
  };

  @action
  public changePlayingRatio = (ratio: number) => {
    const time = (audio.duration * ratio) / 100;
    audio.currentTime = time;
    this.setPlayedTime(time);
    this.currentLyricIndex = 0;
  };

  @action
  public playVolTrack = (volId: number, trackIndex: number = 0) => {
    if (
      this.playingType === PlayingTypes.VOL &&
      volId === this.playingVolId &&
      trackIndex === this.playingVolTrackIndex
    ) {
      return this.play();
    }

    this.playingVolId = volId;
    this.playingVolTrackIndex = trackIndex;
    this.playingType = PlayingTypes.VOL;
    this.playingStatus = PlayingStatus.PLAYING;
    return this.updatePlayingAudio();
  };

  @action
  public playSingle = (singleId: number) => {
    if (
      this.playingType === PlayingTypes.SINGLE &&
      singleId === this.playingSingleId
    ) {
      return this.play();
    }

    this.playingSingleId = singleId;
    this.playingType = PlayingTypes.SINGLE;
    this.playingStatus = PlayingStatus.PLAYING;
    return this.updatePlayingAudio();
  };

  @action
  public playArticleTrack = (articleId: number, trackIndex: number = 0) => {
    if (
      this.playingType === PlayingTypes.ARTICLE &&
      articleId === this.playingArticleId &&
      trackIndex === this.playingArticleTrackIndex
    ) {
      return this.play();
    }

    this.playingArticleId = articleId;
    this.playingArticleTrackIndex = trackIndex;
    this.playingType = PlayingTypes.ARTICLE;
    this.playingStatus = PlayingStatus.PLAYING;
    return this.updatePlayingAudio();
  };

  @action
  public play = () => {
    this.playingStatus = PlayingStatus.PLAYING;
    return audio.play();
  };

  @action
  public pause = () => {
    this.playingStatus = PlayingStatus.PAUSE;
    return audio.pause();
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
      case PlayingTypes.ARTICLE: {
        this.nextArticleTrack();
        break;
      }
    }
    this.playingStatus = PlayingStatus.PLAYING;
    return this.updatePlayingAudio();
  };

  @action
  private nextVolTrack = () => {
    const { tracks } = this.playingVol;
    if (tracks.length === 1) {
      return;
    }

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
  private nextArticleTrack = () => {
    const { tracks } = this.playingArticle;
    if (tracks.length === 1) return;

    if (this.playingArticleTrackIndex + 1 === tracks.length) {
      this.playingArticleTrackIndex = 0;
    } else {
      this.playingArticleTrackIndex += 1;
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
      case PlayingTypes.ARTICLE: {
        this.preArticleTrack();
        break;
      }
    }
    this.playingStatus = PlayingStatus.PLAYING;
    return this.updatePlayingAudio();
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

  @action
  private preArticleTrack = () => {
    const { tracks } = this.playingArticle;
    if (tracks.length === 1) return;

    if (this.playingArticleTrackIndex === 0) {
      this.playingArticleTrackIndex = tracks.length - 1;
    } else {
      this.playingArticleTrackIndex -= 1;
    }
  };

  /*
  * @desc Lyric
   */
  @observable
  private lyrics: LrcLine[] | null = null;

  @observable
  private currentLyricIndex: number = 0;

  @computed
  public get playingLyrics(): string[] | null {
    const {lyrics, currentLyricIndex: i } = this;
    if (!lyrics) {
      return null;
    }
    const empty = { text: ' ' };
    return [
      lyrics[i - 4] || empty,
      lyrics[i - 3] || empty,
      lyrics[i - 2] || empty,
      lyrics[i - 1] || empty,
      lyrics[i],
      lyrics[i + 1] || empty,
      lyrics[i + 2] || empty,
      lyrics[i + 3] || empty,
      lyrics[i + 4] || empty,
    ].map(i => i.text);
  }

  @action
  private changeCurrentLyricIndex = () => {
    if (!this.lyrics) {
      return null;
    }

    const { playedTime, lyrics, currentLyricIndex } = this;
    if (currentLyricIndex + 1 === this.lyrics.length) {
      return;
    }

    if (playedTime > lyrics[currentLyricIndex + 1].timestamp) {
      this.currentLyricIndex++;
    }
  };
}

const playerStore = new PlayerStore();

export { playerStore };
