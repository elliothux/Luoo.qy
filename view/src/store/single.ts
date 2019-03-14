import { action, computed, observable, reaction } from "mobx";
import { getIPC } from "../utils";
import { ViewTypes, Single } from "../types";
import { Pagination } from "./pagination";
import { store } from "./index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class SingleStore {
  /*
  @desc Init
   */
  public init = async () => {
    this.initReaction();
    await this.updateTotal();
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
  public get pagination(): Maybe<Pagination> {
    return this.total
      ? Pagination.from(this.total, PAGE_SCALE, PAGINATION_SCALE)
      : null;
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

    this.displayedItems = await ipc.db.single.find<Single>({
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
