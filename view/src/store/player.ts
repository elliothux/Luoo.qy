import { action, computed, observable } from "mobx";
import {volStore} from "./vol";
import {PlayingStatus, PlayingTypes, VolTrack} from "../types";

let ipc: IpcObject;

class PlayerStore {
    @action
    init = async (IPC: IpcObject) => {
        ipc = IPC;
    };

    @computed
    public get playingInfo(): VolTrack {
        const { tracks } = volStore.vols[volStore.playingVolIndex];
        return tracks[volStore.playingTrackIndex] as VolTrack;
    }

    @observable
    public playStatus: PlayingStatus = PlayingStatus.PLAYING;

    @observable
    private playingType: PlayingTypes = PlayingTypes.VOL;

    @observable
    public totalTime: number = 100;

    @computed
    public get formatedTotalTime() {
        return formatPlayingTime(this.totalTime);
    }

    @observable
    public playedTime: number = 33;

    @computed
    public get formatedPlayedTime() {
        return formatPlayingTime(this.playedTime);
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
