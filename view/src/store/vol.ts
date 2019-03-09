import { action, computed, observable } from "mobx";
import {events, EventTypes, genRange, getIPC, promiseWrapper} from "../utils";
import { VolTypesList, VolTypes, VolTypeItem } from "../@types";
import { store } from "./index";
import { ViewTypes, VolInfo } from "../@types";

const ipc: IpcObject = getIPC();

class VolStore {
  @action
  init = async () => {
    this.updateAllVols(await ipc.db.vol.getVols());
    setTimeout(() => {
      this.updateFromCGI().catch(console.error);
    }, 10);
  };

  @action
  private updateFromCGI = async () => {
    const latestVol = await ipc.db.vol.getLatestVol();

    const [vols, error] = await promiseWrapper<VolInfo[]>(
      ipc.request.requestVols(latestVol ? latestVol.vol + 1 : 0)
    );

    if (error) {
      throw error;
    }

    if (vols && vols.length > 0) {
      await ipc.db.vol.saveVols(vols);
    }

    this.updateAllVols(await ipc.db.vol.getVols());
  };

  @action
  private updateAllVols = (vols: VolInfo[]) => {
    const readonlyVols = vols.map(i => Object.freeze(i));
    this.allVols = Object.freeze(readonlyVols);
  };

  @observable
  public allVols: ReadonlyArray<VolInfo> = [];

  @computed
  public get vols(): ReadonlyArray<VolInfo> | VolInfo[] {
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
  public selectVolById = async (volId: number) => {
    if (volId === this.selectedVol.id && store.view === ViewTypes.VOL_INFO) {
      return;
    }

    const vol = await ipc.db.vol.getVolById(volId);
    if (!vol) {
      throw new Error(`vol id-${volId} not exists`);
    }

    let vols;
    if (
      this.volType !== VolTypes.ALL &&
      vol.tags.includes(this.volTypeItem.name)
    ) {
      vols = this.vols;
    } else {
      this.changeVolType(VolTypes.ALL);
      vols = this.allVols;
    }

    const volIndex = vols.findIndex(i => i.id === volId);
    const index = volIndex % this.volPageScale;
    this.volCurrentPage = (volIndex - index) / this.volPageScale;

    store.changeView(ViewTypes.VOLS, false, () => {
      setTimeout(() => events.emit(EventTypes.SelectVol, index), 200);
    });
  };
}

const volStore = new VolStore();

export { volStore };
