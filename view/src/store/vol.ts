import { action, computed, observable } from "mobx";
import { events, EventTypes, genRange } from "../utils";
import {
  ViewTypes,
  VolInfo,
  VolTypeItem,
  VolTypes,
  VolTypesList
} from "../types";
import { store } from "./index";
import { debug } from "util";

let ipc: IpcObject;

function getVolsFromDB(): Promise<VolInfo[]> {
  return ipc.db.vol.get();
}

async function fetchVols(): Promise<VolInfo[]> {
  try {
    const latest: number = await ipc.db.vol.latest();
    const { data } = await ipc.requestVols(latest + 1);
    return data.sort((i: VolInfo, j: VolInfo) => j.vol - i.vol);
  } catch (e) {
    throw e;
  }
}

class VolStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;

    this.allVols = await getVolsFromDB();

    try {
      let vols = await fetchVols();
      if (vols.length > 0) {
        for (let vol of vols) {
          await ipc.db.vol.add(vol);
          for (let track of vol.tracks) {
            await ipc.db.volTrack.add(track);
          }
        }
        this.allVols = await getVolsFromDB();
      }
    } catch (e) {
      console.error(e);
    }
  };

  @observable
  public allVols: VolInfo[] = [];

  @computed
  public get vols(): VolInfo[] {
    if (this.volType === VolTypes.ALL) {
      return this.allVols;
    }
    return this.allVols.filter(vol => vol.tags.includes(this.volTypeItem.name));
  }

  @observable
  public volType: VolTypes = VolTypes.ALL;

  @computed
  public get volTypeItem(): VolTypeItem {
    const item = VolTypesList.find(
      (t: VolTypeItem) => t.value === this.volType
    );
    if (!item) {
      throw new Error(`Invalid Vol Type`);
    }
    return item;
  }

  @action
  public changeVolType = (type: VolTypes) => {
    this.volCurrentPage = 0;
    this.volType = type;
    store.changeView(ViewTypes.VOLS);
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
  public selectedVolIndex: number = 0;

  @computed
  public get selectedVol(): VolInfo {
    return this.displayVols[this.selectedVolIndex];
  }

  @action
  public selectVol = (volIndex: number) => {
    this.selectedVolIndex = volIndex;
    store.changeView(ViewTypes.VOL_INFO);
    store.changeBackground(ViewTypes.VOLS);
  };

  @action
  public selectVolById = (volId: number) => {
    if (volId === this.selectedVol.id && store.view === ViewTypes.VOL_INFO) {
      return;
    }

    const volIndex = this.allVols.findIndex(i => i.id === volId);
    const page = volIndex % this.volPageScale;
    const index = volIndex - page * this.volPageScale;
    this.volCurrentPage = page;

    store.changeView(ViewTypes.VOLS, false, () => {
      setTimeout(() => events.emit(EventTypes.SelectVol, index), 200);
    });
  };
}

const volStore = new VolStore();

export { volStore };
