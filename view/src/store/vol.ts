import {action, computed, observable} from "mobx";
import {genRange} from "../utils";
import {ViewTypes, VolInfo, VolTypeItem, VolTypes, VolTypesList} from "../types";
import {store} from './index';


let ipc: IpcObject;

class VolStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;

    this.allVols = await this.getVolsFromDB();

    let vols = await this.fetchVols();
    if (vols.length > 0) {
      for (let vol of vols) {
        await ipc.db.vol.add(vol);
        for (let track of vol.tracks) {
          await ipc.db.track.add(track);
        }
      }
      this.allVols = await this.getVolsFromDB();
    }
  };

  @observable
  private allVols: VolInfo[] = [];

  @computed
  public get vols(): VolInfo[] {
    if (this.volType === VolTypes.ALL) {
      return this.allVols;
    }
    return this.allVols.filter(vol => vol.tags.includes(this.volTypeItem.name));
  };

  @observable
  public volType: VolTypes = VolTypes.ALL;

  @computed
  public get volTypeItem(): VolTypeItem {
      const item = VolTypesList.find((t: VolTypeItem) => t.value === this.volType);
      if (!item) {
        throw new Error(`Invalid Vol Type`);
      }
      return item;
  }

  @action
  public changeVolType = (type: VolTypes) => {
    this.volType = type;
    store.changeView(ViewTypes.VOLS);
  };

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
    const end = Math.min(
      (this.volCurrentPage + 1) * this.volPageScale,
      this.vols.length
    );
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
  public playingVolIndex: number = 11;

  @observable
  public playingTrackIndex: number = 0;
}

const volStore = new VolStore();

export { volStore };
