import { action, computed, observable } from "mobx";
import { getIPC } from "../utils";
import {
  PlayingStatus,
  PlayingTypes,
  ViewTypes,
  VolInfo,
  VolTrack
} from "../types";

let ipc: IpcObject;

class Store {
  @action
  init = async (): Promise<void> => {
    ipc = await getIPC();
    let vols: VolInfo[];
    if (!await ipc.db.vol.isExist()) {
      vols = await this.fetchVols();

    } else {
      vols = await this.getVolsFromDB();
    }
    debugger;
    this.vols = vols;
  };

  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @observable
  private vols: VolInfo[] = [];

  private getVolsFromDB = async (): Promise<VolInfo[]> => {
    const vols = await ipc.db.vol.get();
    return vols;
  };

  private fetchVols = async (): Promise<VolInfo[]> => {
    try {
      const { data } = await ipc.requestVols(1, 997);
      return data.sort((i: VolInfo, j: VolInfo) => j.vol - i.vol);
    } catch (e) {
      throw e;
    }
  };

  protected pageScale = 3 * 10;

  @observable
  public volCurrentPage: number = 0;

  @computed
  public get volTotalPage(): number {
    return this.vols.length % this.pageScale;
  }

  @computed
  public get displayVols(): VolInfo[] {
    const start = this.volCurrentPage * this.pageScale;
    const end = (this.volCurrentPage + 1) * this.pageScale;
    return this.vols.slice(start, end);
  }

  @observable
  public paginationCurrentPage: number = 0;
  //
  // @computed
  // public get display

  @observable
  private selectedVolIndex: number = 11;

  @computed
  public get selectedVol(): VolInfo {
    return this.vols[this.selectedVolIndex];
  }

  @observable
  private playingVolIndex: number = 11;

  @observable
  private playingTrackIndex: number = 0;

  @computed
  public get playingInfo(): VolTrack {
    const { tracks } = this.vols[this.playingVolIndex];
    return tracks[this.playingTrackIndex] as VolTrack;
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

export { store };
