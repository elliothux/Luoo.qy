import { action, computed, observable } from "mobx";
import { events, EventTypes, exec, genRange, getIPC } from "../utils";
import {
  ViewTypes,
  VolInfo,
  VolTypeItem,
  VolTypes,
  VolTypesList
} from "../@types";
import { store } from "./index";

type ID = number;

const ipc: IpcObject = getIPC();

class VolStore {
  @action
  init = async () => {
    exec(this.updateIds);
    // setTimeout(() => {
    //   this.updateFromCGI().catch(console.error);
    // }, 10);
  };

  @action
  private fetchFromCGI = async () => {
    // const latestVol = await ipc.db.vol.getLatestVol();
    // const [vols, error] = await promiseWrapper<VolInfo[]>(
    //   ipc.request.requestVols(latestVol ? latestVol.vol + 1 : 0)
    // );
    //
    // if (error) {
    //   throw error;
    // }
    //
    // if (vols && vols.length > 0) {
    //   await ipc.db.vol.saveVols(vols);
    // }
    //
    // this.updateAllVols(await ipc.db.vol.getVols());
  };

  @observable
  private ids: Maybe<ID[]> = null;

  @action
  private updateIds = async (cb?: Callback) => {
    this.ids = null;
    const query =
      this.volType === VolTypes.ALL
        ? {}
        : { tags: { $elemMatch: this.volTypeItem.name } };
    this.ids = await ipc.db.vol.getIds(query);
    if (typeof cb === 'function') {
      cb();
    }
  };

  @observable
  private volType: VolTypes = VolTypes.ALL;

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
    this.paginationCurrentIndex = 0;
    this.currentPage = 0;
    this.volType = type;
    events.emit(EventTypes.ScrollBackVols);
    store.changeView(ViewTypes.VOLS);
    exec(this.updateIds);
  };

  @computed
  public get displayIds(): number[] {
    if (!this.ids) {
      return [];
    }

    const start = this.currentPage * this.pageScale;
    const end = Math.min(
      (this.currentPage + 1) * this.pageScale,
      this.ids.length
    );
    return this.ids.slice(start, end);
  }

  @observable
  public selectedVolId: number = 0;

  @action
  public selectVol = (volId: number) => {
    this.selectedVolId = volId;
    store.changeView(ViewTypes.VOL_INFO);
    store.changeBackground(ViewTypes.VOLS);
  };

  /*
  @desc: pagination
   */
  protected pageScale = 3 * 4;

  @observable
  public currentPage: number = 0;

  @action
  public togglePageIndex = (page: number) => {
    events.emit(EventTypes.ScrollBackVols, true);
    this.currentPage = page;
  };

  @computed
  public get totalPage(): number {
    if (!this.ids) {
      return 0;
    }
    return Math.ceil(this.ids.length / this.pageScale);
  }

  protected paginationScale = 9;

  @observable
  public paginationCurrentIndex: number = 0;

  @computed
  public get paginationTotalIndex(): number {
    return Math.ceil(this.totalPage / this.paginationScale);
  }

  @computed
  public get displayPaginations(): number[] {
    const start = this.paginationCurrentIndex * this.paginationScale;
    const end = Math.min(
        (this.paginationCurrentIndex + 1) * this.paginationScale,
        this.totalPage
    );
    return genRange(start, end);
  }

  @action
  public nextPagination = () => {
    this.paginationCurrentIndex += 1;
  };

  @action
  public prePagination = () => {
    this.paginationCurrentIndex -= 1;
  };
}

const volStore = new VolStore();

export { volStore };
