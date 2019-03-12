import { action, computed, observable, reaction } from "mobx";
import { getIPC } from "../utils";
import { VolType, VolTypeItem, VolTypesMap } from "../types";
import { Pagination } from "./pagination";

interface VolItemInfo {
  id: ID;
  cover: string;
  title: string;
  vol: number;
}

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class VolStore {
  public init = async () => {
    this.initReaction();
    await this.initData();
  };

  private initReaction = () => {
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start } = this.pagination;
      return [this.total, this.type, start];
    }, this.updateDisplayedItems);
  };

  @action
  private initData = async () => {
    this.total = await ipc.db.vol.count();
  };

  @observable
  private total: Maybe<number> = null;

  @computed
  public get pagination(): Maybe<Pagination> {
    return this.total
      ? Pagination.from(this.total, PAGE_SCALE, PAGINATION_SCALE)
      : null;
  }

  @observable
  public displayedItems: Maybe<VolItemInfo[]> = null;

  @action
  private updateDisplayedItems = async () => {
    this.displayedItems = null;

    if (!this.pagination) {
      return;
    }

    this.displayedItems = await ipc.db.vol.find<VolItemInfo>({
      skip: this.pagination.start,
      limit: PAGE_SCALE,
      query:
        this.type === VolType.All
          ? {}
          : { tags: { $elemMatch: this.typeItem.name } },
      sort: { vol: -1 },
      projection: {
        id: 1,
        cover: 1,
        title: 1,
        vol: 1
      }
    });
  };

  @observable
  private type: VolType = VolType.All;

  @computed
  public get typeItem(): VolTypeItem {
    return VolTypesMap[this.type] as VolTypeItem;
  }

  @action
  public setType = (type: VolType) => {
    this.type = type;
  };
}

const volStore = new VolStore();

export { volStore };
