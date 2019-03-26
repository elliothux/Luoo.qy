import { action, computed, observable, reaction } from "mobx";
import {exec, getIPC} from "../utils";
import { ViewTypes, Single, TrackType } from "../types";
import { Pagination } from "./pagination";
import { store } from "./index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class SingleStore {
  constructor() {
    this.initReaction();
  }
  /*
  @desc Init
   */
  public init = async () => {
    await this.updateTotal();
    exec(this.updateFromCGI);
  };

  private initReaction = () => {
    // observer for singles
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start } = this.pagination;
      return [this.total, start];
    }, this.updateDisplayedItems);
    // observer for single
    reaction(() => this.displayedItemId, this.updateDisplayedItem);
    // observer for cover
    reaction(() => this.displayedItem ? this.displayedItem.cover : null, () => {
      if (store.view === ViewTypes.SINGLE_INFO && this.displayedItem) {
        store.setBackgroundImage(this.displayedItem.cover);
      }
    });
  };

  private updateFromCGI = async () => {
    const items = await ipc.request.requestSingles(await ipc.db.single.latestID());
    if (items.length) {
      await ipc.db.single.insert(items);
      await this.updateTotal();
    }
  };

  /*
  @desc Pagination
   */
  @observable
  private total: Maybe<number> = null;

  @action
  private updateTotal = async () => {
    this.total = await ipc.db.single.count();
  };

  @computed
  public get pagination(): Pagination {
    return Pagination.from(this.total || 0, PAGE_SCALE, PAGINATION_SCALE);
  }

  /*
  @desc DisplayedItems
   */
  @observable
  public displayedItems: Maybe<Single[]> = null;

  @action
  private updateDisplayedItems = async () => {
    // this.displayedItems = null;

    if (!this.pagination) {
      return;
    }

    const items = await ipc.db.single.find<Single>({
      skip: this.pagination.start,
      limit: PAGE_SCALE,
      sort: { id: -1 },
      projection: {
        desc: 0,
        date: 0,
        recommender: 0,
        url: 0
      }
    });
    this.displayedItems = items.map(i => ({ ...i, type: TrackType.SINGLE }));
  };

  /*
  @desc DisplayedItem
   */
  @observable
  private displayedItemId: Maybe<ID> = null;

  @observable
  public displayedItem: Maybe<Single> = null;

  @action
  public setItem = (id: ID) => {
    this.displayedItemId = id;
    store.changeView(ViewTypes.SINGLE_INFO);
  };

  @action
  public updateDisplayedItem = async () => {
    if (!this.displayedItemId) {
      return;
    }

    this.displayedItem = (await ipc.db.single.findOne({
      id: this.displayedItemId
    })) as Single;
  };
}

const singleStore = new SingleStore();

export { singleStore };
