import { action, computed, observable, reaction } from "mobx";
import { events, EventTypes, exec, genRange, getIPC } from "../utils";
import { ViewTypes, VolTypeItem, VolType, VolTypesList } from "../@types";
import { store } from "./index";
import {Pagination} from "./pagination";

interface VolItemInfo {
  id: ID;
  cover: string;
  title: string;
  vol: number;
}

const ipc: IpcObject = getIPC();

class VolStore {
  @action
  init = async () => {
    await this.updateIdsFromDB();
  };

  @observable
  pagination: Pagination = Pagination.from(0);

  @observable
  private ids: Maybe<ID[]> = null;

  @action
  private updateIdsFromDB = async () => {
    this.ids = null;
    const query =
      this.volType === VolType.All
        ? {}
        : { tags: { $elemMatch: this.volTypeItem.name } };
    this.ids = await ipc.db.vol.getIds(query);
    return this.updateDisplayItems();
  };

  @observable
  private volType: VolType = VolType.All;

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
  public changeVolType = (type: VolType) => {
    this.paginationCurrentIndex = 0;
    this.volType = type;
    this.changeCurrentPage(0);
    store.changeView(ViewTypes.VOLS);
    exec(this.updateIdsFromDB);
  };

  @computed
  private get displayIds(): Maybe<ID[]> {
    if (!this.ids) {
      return null;
    }

    const start = this.currentPage * this.pageScale;
    const end = Math.min(
      (this.currentPage + 1) * this.pageScale,
      this.ids.length
    );
    return this.ids.slice(start, end);
  }

  @observable
  public displayItems: Maybe<VolItemInfo[]> = null;

  @action
  private updateDisplayItems = async () => {
    this.displayItems = null;
    if (!this.displayIds) {
      return;
    }
    this.displayItems = await ipc.db.vol.getByIds(this.displayIds, [
      "id",
      "cover",
      "title",
      "vol"
    ]) as VolItemInfo[];
  };

  @observable
  private selectedVolId: Maybe<ID> = null;

  @action
  public selectVol = (volId: ID) => {
    this.selectedVolId = volId;
    store.changeView(ViewTypes.VOL_INFO);
  };
}

const volStore = new VolStore();

export { volStore };
