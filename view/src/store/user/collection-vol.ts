import { action, computed, observable, reaction } from "mobx";
import { toast } from "react-toastify";
import { exec, getIPC, promiseWrapper } from "../../utils";
import { Pagination } from "../pagination";
import { ViewTypes, VolInfo } from "../../types";
import { store } from "../index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class CollectionVol {
  constructor() {
    this.initReaction();
  }
  /*
    @desc Init
     */
  public init = async () => {
    this.ids = ipc.user.getUserLikedVolIds();
    // exec(this.updateFromCGI);
    if (!this.ids.length) {
      exec(this.updateFromCGI);
    }
  };

  private initReaction = () => {
    // observer for vols
    reaction(() => {
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
    const tracks = await ipc.db.volTrack.find({
      query: { volId: volInfo.id },
      sort: { id: -1 }
    });
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
  };

  /*
  @desc Fetch liking
   */
  @observable
  private fetchIds: ID[] = [];

  public isFetchingLike = (id: ID): boolean => {
    return this.fetchIds.includes(id);
  };

  @action
  public toggleLike = async (id: ID, liked: boolean) => {
    this.fetchIds.push(id);
    const startTime = Date.now();

    const [ids, error] = await promiseWrapper<number[]>(
      liked ? ipc.user.unlikeVol(id) : ipc.user.likeVol(id)
    );
    const MIN_TIME = 1000;
    const timeout = Date.now() - startTime < MIN_TIME ? MIN_TIME : 0;

    setTimeout(() => {
      if (error || !ids) {
        console.error(error);
        toast.warn(liked ? "取消收藏失败" : "期刊收藏失败");
      } else {
        this.ids = ids;
        toast.warn(liked ? "取消收藏成功" : "期刊收藏成功");
      }
      this.fetchIds = this.fetchIds.filter(i => i !== id);
    }, timeout);
  };
}

const collectionVolStore = new CollectionVol();

export { collectionVolStore };
