import { action, computed, observable, reaction } from "mobx";
import { getIPC } from "../utils";
import {VolInfo, VolType, VolTypeItem, VolTypesMap} from "../types";
import { Pagination } from "./pagination";


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
  public displayedItems: Maybe<VolInfo[]> = null;

  @action
  private updateDisplayedItems = async () => {
    this.displayedItems = null;

    if (!this.pagination) {
      return;
    }

    this.displayedItems = await ipc.db.vol.find<VolInfo>({
      skip: this.pagination.start,
      limit: PAGE_SCALE,
      query:
        this.type === VolType.All
          ? {}
          : { tags: { $elemMatch: this.typeItem.name } },
      sort: { vol: -1 },
      projection: {
        link: 0,
        author: 0,
        authorAvatar: 0,
        date: 0,
        desc: 0,
        similarVols: 0
      }
    });
  };

  @observable
  public type: VolType = VolType.All;

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
