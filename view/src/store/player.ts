import {action, computed, observable} from "mobx";
import {Howl, Howler} from 'howler';
import {volStore} from "./vol";
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
import {singleStore} from "./single";
import {articleStore} from "./article";

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
    private playingVolIndex: number = 0;

    @observable
    private playingVolTrackIndex: number = 0;

    @computed
    private get playingVol(): VolInfo {
        return volStore.vols[this.playingVolIndex];
    }

    @computed
    private get playingVolTrack(): VolTrack {
        const { tracks } = this.playingVol;
        return tracks[this.playingVolTrackIndex];
    }

    /*
    * @desc Single
     */
    @observable
    private playingSingleIndex: number = 0;

    @computed
    private get playingSingle(): Single {
        return singleStore.singles[this.playingSingleIndex];
    }

    /*
    * @desc Article
     */
    @observable
    private playingArticleIndex: number = 0;

    @observable
    private playingArticleTrackIndex: number = 0;

    @computed
    private get playingArticle(): ArticleInfo {
        return articleStore.articles[this.playingArticleIndex];
    }

    @computed
    private get playingArticleTrack(): ArticleTrack {
        return this.playingArticle.tracks[this.playingArticleTrackIndex];
    }

    /*
    * @desc Playing
     */
    @computed
    public get playingInfo(): Track {
        switch (this.playingType) {
            case PlayingTypes.VOL: return this.playingVolTrack;
            case PlayingTypes.SINGLE: return this.playingSingle;
            case PlayingTypes.ARTICLE: return this.playingArticleTrack;
        }
    }

    @observable
    public playStatus: PlayingStatus = PlayingStatus.PLAYING;

    @observable
    public playMode: PlayingMode = PlayingMode.ORDER;

    @observable
    private playingType: PlayingTypes = PlayingTypes.VOL;

    /*
    * @desc Duration
     */
    @observable
    public playedTime: number = 33;

    @observable
    public totalTime: number = 100;

    @computed
    public get formatedPlayedTime() {
        return formatPlayingTime(this.playedTime);
    }

    @computed
    public get formatedTotalTime() {
        return formatPlayingTime(this.totalTime);
    }

    @computed
    get playingProgress(): number {
        return Math.ceil((this.playedTime / this.totalTime) * 100);
    }
}

function formatPlayingTime(time: number): string {
    let minutes: number | string = Math.floor(time / 60);
    let seconds: number | string = time - (minutes * 60);

    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return `${minutes}:${seconds}`;
}


const playerStore = new PlayerStore();

export { playerStore };
