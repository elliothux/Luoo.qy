import { action, computed, observable, reaction } from "mobx";
import { Pagination } from "../pagination";
import { VolInfo } from "../../types";
import {getIPC} from "../../utils";

const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;


const ipc = getIPC();

class SearchVol {
  constructor() {
    this.initReaction();
  }

  private initReaction = () => {
    reaction(() => {
      const { start } = this.pagination;
      return [this.total, start];
    }, this.updateDisplayedItems);
  };

  @observable
  private ids: ID[] = [];

  @action
  public setIds = (ids: ID[]) => {
    this.ids = ids
  };

  @computed
  private get total(): number {
    return this.ids.length;
  }

  @computed
  public get pagination(): Pagination {
    return Pagination.from(this.total, PAGE_SCALE, PAGINATION_SCALE);
  }

  public isLiked = (id: ID): boolean => {
    return this.ids.includes(id);
  };

  /*
    @desc DisplayedItems
     */
  @observable
  public displayedItems: VolInfo[] = [];

  @action
  private updateDisplayedItems = async () => {
    this.displayedItems = await ipc.db.vol.find<VolInfo>({
      skip: this.pagination.start,
      limit: PAGE_SCALE,
      query: { id: { $in: this.ids } },
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
}

const searchVolStore = new SearchVol();

export { searchVolStore };
