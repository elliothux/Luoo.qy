import {action, computed, observable} from "mobx";
import {ipc} from "../utils";
import {PlayingTypes, ViewTypes, VolInfo, VolTrack} from "../types";

class Store {
  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @observable
  public vols: VolInfo[] = [];

  @action
  public getVols = async (): Promise<VolInfo[]> => {
    const { data } = JSON.parse(await ipc.requestVols(900, 920));
    this.vols = data as VolInfo[];
    return this.vols;
  };

  @observable
  private selectedVolIndex: number = 11;

  @computed
  public get selectedVol(): VolInfo {
    return this.vols[this.selectedVolIndex];
  }

  @observable
  public isPlaying = true;

  @observable
  private playingType: PlayingTypes = PlayingTypes.VOL;

  @observable
  private playingVolIndex: number = 11;

  @observable
  private playingTrackIndex: number = 0;

  @computed
  public get playingInfo(): VolTrack {
    const { tracks } = this.vols[this.playingVolIndex];
    return tracks[this.playingTrackIndex] as VolTrack;
  }
}

const store = new Store();

export { store };
