import {action, computed, observable, reaction} from "mobx";
import {formatPlayingTime, getIPC, LrcLine, LyricParser} from "../utils";
import {PlayingMode, PlayingStatus, PlayingTypes, Track, TrackType} from "../types";

const ipc = getIPC();
const audio: HTMLAudioElement = new Audio();

class PlayerStore {
  @action
  public init = async () => {
    this.initReaction();
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
      () => (this.playingTrack ? this.playingTrack.url : null),
      () => {
        this.setPlayedTime(0);
        return this.changeAudio();
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
    return this.updatePlayingInfo();
  }

  @observable
  public playingTrack: Maybe<Track> = null;

  @action
  private updatePlayingInfo = async () => {
    const id = this.playingIds[this.playingIndex];
    if (!id) {
      this.playingTrack = null;
    }
    const query = { id };
    switch (this.playingType) {
      case PlayingTypes.VOL:
      case PlayingTypes.COLLECTION_VOL: {
        const track = await ipc.db.volTrack.findOne(query);
        this.playingTrack = {
          ...track,
          type: TrackType.VOL_TRACK
        } as Track;
        return;
      }
      case PlayingTypes.ARTICLE:
      case PlayingTypes.COLLECTION_ARTICLE: {
        const track = await ipc.db.articleTrack.findOne(query);
        this.playingTrack = {
          ...track,
          type: TrackType.ARTICLE_TRACK
        } as Track;
        return;
      }
      case PlayingTypes.SINGLE: {
        const track = await ipc.db.single.findOne(query);
        this.playingTrack = {
          ...track,
          type: TrackType.SINGLE
        } as Track;
        return;
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
          throw new Error(`Cannot found track id${id}`);
        }
        return;
      }
      default: {
        throw new Error(`Invalid playing-type`);
      }
    }
  };

  @action
  public setPlayingIds = (ids: number[], currentId: Maybe<number>) => {
    this.playingIds = ids;
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

  public isPlaying(id: ID): boolean {
    if (!this.playingTrack || this.playingStatus !== PlayingStatus.PLAYING) {
      return false;
    }
    return this.playingTrack.id === id;
  }

  /*
  * @desc Control
   */
  private changeAudio = () => {
    if (!this.playingTrack) {
      return;
    }
    const { url: src } = this.playingTrack;
    if (src === audio.src) {
      return;
    }
    audio.pause();
    audio.src = src;
    audio.load();
    return audio.play();
  };

  @action
  public changePlayingRatio = (ratio: number) => {
    const time = (audio.duration * ratio) / 100;
    audio.currentTime = time;
    this.setPlayedTime(time);
    this.currentLyricIndex = 0;
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
  /*
    * @desc Lyric
     */
  @computed
  get lyrics(): Maybe<LrcLine[]> {
    if (!this.playingTrack || !this.playingTrack.lyric) {
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
    const empty = { text: " " };
    return [
      lyrics[i - 4] || empty,
      lyrics[i - 3] || empty,
      lyrics[i - 2] || empty,
      lyrics[i - 1] || empty,
      lyrics[i],
      lyrics[i + 1] || empty,
      lyrics[i + 2] || empty,
      lyrics[i + 3] || empty,
      lyrics[i + 4] || empty
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
