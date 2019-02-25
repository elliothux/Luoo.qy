import {action, computed, observable} from "mobx";
import {events, EventTypes, genRange} from "../utils";
import {ViewTypes, VolInfo, VolTypeItem, VolTypes, VolTypesList} from "../types";
import {store} from "./index";

let ipc: IpcObject;

function getVolsFromDB(): Promise<VolInfo[]> {
  return Promise.resolve([]);
}

async function fetchVols(): Promise<VolInfo[]> {
  return Promise.resolve([]);
}

class VolStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;
    this.allVols = await getVolsFromDB();
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
    this.volPaginationCurrentIndex = 0;
    this.volCurrentPage = 0;
    this.volType = type;
    events.emit(EventTypes.ScrollBackVols);
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
    events.emit(EventTypes.ScrollBackVols, true);
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

    this.changeVolType(VolTypes.ALL);
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
