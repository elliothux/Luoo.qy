import { action, computed, observable } from "mobx";
import { getIPC } from "../utils";
import { PlayingStatus, PlayingTypes, VolTrack, ViewTypes } from "../types";
import { volStore } from "./vol";

let ipc: IpcObject;

class Store {
  @action
  init = async (): Promise<void> => {
    ipc = await getIPC();
    await volStore.init(ipc);
  };


  @observable
  public view: ViewTypes = ViewTypes.VOLS;

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
  public totalTime: number = 33;

  @observable
  public playedTime: number = 100;

  @computed
  get playingProgress(): number {
    return Math.ceil((this.totalTime / this.playedTime) * 100);
  }
}

const store = new Store();

export { store, volStore };
