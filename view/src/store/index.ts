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

function genRange(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

class Store {
  @action
  init = async (): Promise<void> => {
    ipc = await getIPC();

    this.vols = await this.getVolsFromDB();

    let vols = await this.fetchVols();
    if (vols.length > 0) {
      for (let vol of vols) {
        await ipc.db.vol.add(vol);
        for (let track of vol.tracks) {
          await ipc.db.track.add(track);
        }
      }
      this.vols = await this.getVolsFromDB();
    }
  };

  @observable
  public view: ViewTypes = ViewTypes.VOLS;

  @observable
  private vols: VolInfo[] = [];

  private getVolsFromDB = (): Promise<VolInfo[]> => {
    return ipc.db.vol.get();
  };

  private fetchVols = async (): Promise<VolInfo[]> => {
    try {
      const latest: number = await ipc.db.vol.latest();
      const { data } = await ipc.requestVols(latest + 1);
      return data.sort((i: VolInfo, j: VolInfo) => j.vol - i.vol);
    } catch (e) {
      throw e;
    }
  };

  protected volPageScale = 3 * 4;

  @observable
  public volCurrentPage: number = 0;

  @computed
  public get volTotalPage(): number {
    return Math.ceil(this.vols.length / this.volPageScale);
  }

  @computed
  public get displayVols(): VolInfo[] {
    const start = this.volCurrentPage * this.volPageScale;
    const end = Math.min((this.volCurrentPage + 1) * this.volPageScale, this.vols.length);
    return this.vols.slice(start, end);
  }

  @action
  public toggleVolIndex = (page: number) => {
    this.volCurrentPage = page;
  };

  protected paginationScale = 9;

  @observable
  public volPaginationCurrentIndex: number = 0;

  @computed
  public get volPaginationTotalIndex(): number {
      return Math.ceil(this.volTotalPage / this.paginationScale);
  }

  @computed
  public get displayVolPaginations(): number[] {
      const start = this.volPaginationCurrentIndex * this.paginationScale;
      const end = Math.min(
          (this.volPaginationCurrentIndex + 1) * this.paginationScale,
          this.volTotalPage
      );
      return genRange(start, end);
  }

  @action
  public nextVolPagination = () => {
    this.volPaginationCurrentIndex += 1;
  };

  @action
  public preVolPagination = () => {
      this.volPaginationCurrentIndex -= 1;
  };

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
