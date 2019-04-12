import {action, computed, observable, reaction} from "mobx";
import {exec, formatPlayingTime, getIPC, LrcLine, LyricParser} from "../utils";
import {PlayingMode, PlayingStatus, PlayingTypes, Track, TrackType} from "../types";
import {volStore} from "./vol";
import {articleStore} from "./article";
import {singleStore} from "./single";

const ipc = getIPC();
const audio: HTMLAudioElement = new Audio();

class PlayerStore {
  constructor() {
    this.initReaction();
  }

  @action
  public init = () => {
    this.initAudio();
  };

  @action
  private initAudio = () => {
    audio.addEventListener("canplay", () => {
      if (
        this.playingStatus === PlayingStatus.PLAYING ||
        this.playingStatus === PlayingStatus.FETCHING
      ) {
        return audio.play();
      }
    });
    audio.addEventListener("durationchange", () => {
      return this.setTotalTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
      return this.setPlayedTime(audio.currentTime);
    });
    audio.addEventListener("ended", () => {
      return this.next();
    });
  };

  private initReaction = () => {
    reaction(
      () => [this.playingIds, this.playingIndex],
      this.updatePlayingInfo
    );
    reaction(
      () => (this.playingTrack ? this.playingTrack.url : null),
      async () => {
        this.setPlayedTime(0);
        this.changePlayingRatio(0);
        await this.updateAudio();
        return this.play();
      }
    );
    reaction(
      () => this.playingStatus,
      () => {
        switch (this.playingStatus) {
          case PlayingStatus.PLAYING:
            return audio.play();
          case PlayingStatus.PAUSE:
            return audio.pause();
          default:
            return;
        }
      }
    );
  };

  /*
  @desc player view
   */
  @observable
  public showPlayer: boolean = false;

  @action
  public toggleShowPlayer = (show?: boolean) => {
    this.showPlayer = typeof show === "boolean" ? show : !this.showPlayer;
  };

  /*
    * @desc Playing
    */
  @observable
  private playingIds: ID[] = [];

  @observable
  private playingIndex: number = 0;

  @action
  private setPlayingIndex(index: number) {
    this.playingIndex = index;
    this.play();
  }

  @observable
  public playingTrack: Maybe<Track> = null;

  @action
  private updatePlayingInfo = async () => {
    const id = this.playingIds[this.playingIndex];
    if (!id) {
      this.playingTrack = null;
      return;
    }

    const query = { id };
    switch (this.playingType) {
      case PlayingTypes.VOL: {
        const track = await ipc.db.volTrack.findOne(query);
        this.playingTrack = {
          ...track,
          type: TrackType.VOL_TRACK
        } as Track;
        break;
      }
      case PlayingTypes.ARTICLE: {
        const track = await ipc.db.articleTrack.findOne(query);
        this.playingTrack = {
          ...track,
          type: TrackType.ARTICLE_TRACK
        } as Track;
        break;
      }
      case PlayingTypes.SINGLE: {
        const track = await ipc.db.single.findOne(query);
        this.playingTrack = {
          ...track,
          type: TrackType.SINGLE
        } as Track;
        break;
      }
      case PlayingTypes.COLLECTION_TRACK: {
        const [volTrack, single, articleTrack] = await Promise.all([
          ipc.db.volTrack.findOne(query),
          ipc.db.single.findOne(query),
          ipc.db.articleTrack.findOne(query)
        ]);
        if (volTrack) {
          this.playingTrack = {
            ...volTrack,
            type: TrackType.VOL_TRACK
          } as Track;
        } else if (single) {
          this.playingTrack = {
            ...single,
            type: TrackType.SINGLE
          } as Track;
        } else if (articleTrack) {
          this.playingTrack = {
            ...articleTrack,
            type: TrackType.ARTICLE_TRACK
          } as Track;
        } else {
          throw new Error(`Cannot found track id ${id}`);
        }
        break;
      }
      default: {
        throw new Error(`Invalid playing-type`);
      }
    }
  };

  @action
  public setPlayingIds = (
    ids: number[],
    currentId: Maybe<number>,
    type: PlayingTypes,
    typedId: ID = 0
  ) => {
    this.playingIds = ids;
    this.playingType = type;

    if (type === PlayingTypes.VOL) {
      this.playingVolId = typedId;
    } else if (type === PlayingTypes.ARTICLE) {
      this.playingArticleId = typedId;
    }

    return this.setPlayingIndex(
      typeof currentId === "number" ? ids.findIndex(i => i === currentId) : 0
    );
  };

  @observable
  public playingStatus: PlayingStatus = PlayingStatus.STOP;

  @observable
  public playingMode: PlayingMode = PlayingMode.ORDER;

  @observable
  public playingType: PlayingTypes = PlayingTypes.VOL;

  @observable
  private playingVolId: ID = 0;

  @observable
  private playingArticleId: ID = 0;

  public isVolPlaying = (id: ID): boolean => {
    return (
      this.playingType === PlayingTypes.VOL &&
      this.playingStatus === PlayingStatus.PLAYING &&
      this.playingVolId === id
    );
  };

  public isArticlePlaying = (id: ID): boolean => {
    return (
      this.playingType === PlayingTypes.ARTICLE &&
      this.playingStatus === PlayingStatus.PLAYING &&
      this.playingArticleId === id
    );
  };

  public isTrackPlaying(id: ID): boolean {
    return (
      this.playingStatus === PlayingStatus.PLAYING &&
      !!this.playingTrack &&
      this.playingTrack.id === id
    );
  }

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
  private updateAudio = async () => {
    if (!this.playingTrack) {
      return;
    }
    const { url: src } = this.playingTrack;
    if (src === audio.src) {
      return;
    }
    audio.pause();
    audio.setAttribute('src', src);
    return audio.load();
  };

  @action
  public changePlayingRatio = (ratio: number) => {
    const time = ((audio.duration || 0) * ratio) / 100;
    audio.currentTime = time;
    this.setPlayedTime(time);
    this.currentLyricIndex = 0;
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
    const index =
      this.playingIndex + 1 === this.playingIds.length
        ? 0
        : this.playingIndex + 1;
    return this.setPlayingIndex(index);
  };

  @action
  public pre = () => {
    const index = (this.playingIndex =
      this.playingIndex === 0
        ? this.playingIds.length - 1
        : this.playingIndex - 1);
    return this.setPlayingIndex(index);
  };

  @action
  public goToSource = () => {
    const { playingTrack } = this;
    if (!playingTrack) {
      return;
    }

    const { id, type } = playingTrack;
    switch (type) {
      case TrackType.VOL_TRACK: {
        if ('volId' in playingTrack) {
          return volStore.setItem(playingTrack.volId);
        }
        break;
      }
      case TrackType.ARTICLE_TRACK: {
        if ('articleId' in playingTrack) {
          return articleStore.setItem(playingTrack.articleId);
        }
        break;
      }
      case TrackType.SINGLE: {
        return singleStore.setItem(id);
      }
    }
    throw new Error(`Jump to source failed.`);
  };

  /*
    * @desc Lyric
     */
  @computed
  get lyrics(): Maybe<LrcLine[]> {
    if (
      !this.playingTrack ||
      !this.playingTrack.lyric ||
      this.playingTrack.lyric.match("暂无歌词")
    ) {
      return null;
    }
    const lrc = new LyricParser(this.playingTrack.lyric);
    return lrc.getLyrics();
  }

  @observable
  private currentLyricIndex: number = 0;

  @computed
  public get playingLyrics(): Maybe<string[]> {
    const { lyrics, currentLyricIndex: i } = this;
    if (!lyrics) {
      return null;
    }
    return [
      lyrics[i - 4],
      lyrics[i - 3],
      lyrics[i - 2],
      lyrics[i - 1],
      lyrics[i],
      lyrics[i + 1],
      lyrics[i + 2],
      lyrics[i + 3],
      lyrics[i + 4]
    ].map(i => (i ? i.text : ""));
  }

  @action
  private changeCurrentLyricIndex = () => {
    if (!this.lyrics) {
      return null;
    }

    const { playedTime, lyrics, currentLyricIndex } = this;
    if (
      currentLyricIndex + 1 === this.lyrics.length ||
      !lyrics[currentLyricIndex + 1]
    ) {
      return;
    }

    if (playedTime > lyrics[currentLyricIndex + 1].timestamp) {
      this.currentLyricIndex++;
    }
  };
}

const playerStore = new PlayerStore();

export { playerStore };
