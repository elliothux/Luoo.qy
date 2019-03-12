import { action, computed, observable, reaction } from "mobx";
import { events, EventTypes, exec, genRange, getIPC } from "../utils";
import { ViewTypes, VolTypeItem, VolType, VolTypesList } from "../@types";
import { store } from "./index";
import { Pagination } from "./pagination";

interface VolItemInfo {
  id: ID;
  cover: string;
  title: string;
  vol: number;
}

function getVolItemsInfoFromDB(tag?: string): Promise<ID[]> {
  const query = tag ? { tags: { $elemMatch: tag } } : {};
  return ipc.db.vol.getIds(query);
}

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class VolStore {
  @action
  init = async () => {
    this.total = await ipc.db.vol.count();
    this.initReaction();
  };

  initReaction = () => {
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start, end } = this.pagination;
      return [this.total, start, end];
    }, this.updateDisplayedItems);
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
  public displayedItems: Maybe<VolItemInfo> = null;

  @action
  private updateDisplayedItems = async () => {
    this.displayedItems = null;
    // this.displayedItems = await ipc.
  };
}

const volStore = new VolStore();

export { volStore };
