import { action, computed, observable, reaction } from "mobx";
import { getIPC } from "../../utils";
import { Pagination } from "../pagination";
import { ViewTypes, VolInfo } from "../../types";
import { store } from "../index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class CollectionVol {
  /*
    @desc Init
     */
  public init = async () => {
    this.initReaction();
    this.ids = ipc.user.getUserLikedVolIds();
    await this.updateFromCGI();
  };

  private initReaction = () => {
    // observer for vols
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start } = this.pagination;
      return [this.total, start];
    }, this.updateDisplayedItems);
    // observer for vol
    reaction(() => this.displayedItemId, this.updateDisplayedItem);
  };

  @observable
  private ids: ID[] = [];

  @computed
  private get total(): number {
    return this.ids.length;
  }

  @computed
  public get pagination(): Pagination {
    return Pagination.from(this.total, PAGE_SCALE, PAGINATION_SCALE);
  }

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

  /*
    @desc DisplayedItem
     */
  @observable
  private displayedItemId: Maybe<ID> = null;

  @observable
  public displayedItem: Maybe<VolInfo> = null;

  @action
  public setItem = (id: ID) => {
    this.displayedItemId = id;
    store.changeView(ViewTypes.VOL_INFO);
  };

  @action
  public updateDisplayedItem = async () => {
    if (!this.displayedItemId) {
      return;
    }

    const volInfo = (await ipc.db.vol.findOne({
      id: this.displayedItemId
    })) as VolInfo;
    const tracks = await ipc.db.volTrack.find({ query: { volId: volInfo.id } });
    this.displayedItem = {
      ...volInfo,
      tracks
    } as VolInfo;
  };

  /*
  @desc update from CGI
   */
  @observable
  isFetching = false;

  @action
  public updateFromCGI = async () => {
    this.isFetching = true;
    this.ids = await ipc.user.fetchAndSaveLikedVols();
    this.isFetching = false;
  }
}

const collectionVolStore = new CollectionVol();

export { collectionVolStore };
