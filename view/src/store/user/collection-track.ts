import { action, computed, observable, reaction } from "mobx";
import { toast } from "react-toastify";
import { exec, getIPC, promiseWrapper } from "../../utils";
import { Pagination } from "../pagination";
import { ViewTypes, Track, FindOptions, TrackType } from "../../types";
import { store } from "../index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 7 * 3;
const PAGINATION_SCALE = 9;

class CollectionTrack {
  constructor() {
    this.initReaction();
  }
  /*
    @desc Init
     */
  public init = async () => {
    this.ids = ipc.user.getUserLikedTrackIds();
    if (!this.ids.length) {
      exec(this.updateFromCGI);
    }
  };

  private initReaction = () => {
    // observer for tracks
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start } = this.pagination;
      return [this.total, start];
    }, this.updateDisplayedItems);
    // observer for track
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
  public displayedItems: Track[] = [];

  @action
  private updateDisplayedItems = async () => {
    const from = this.pagination.start;
    const to = from + PAGE_SCALE;
    const options: FindOptions = {
      query: { id: { $in: this.ids.slice(from, to) } },
      sort: { id: -1 }
    };

    const [iVolTracks, iSingles, iArticleTracks] = await Promise.all([
      ipc.db.volTrack.find<Track>(options),
      ipc.db.single.find<Track>(options),
      ipc.db.articleTrack.find<Track>(options)
    ]);

    const volTracks = iVolTracks.map(i => ({
      ...i,
      type: TrackType.VOL_TRACK
    }));
    let volTrackIds = volTracks.map(i => i.id);

    const singles = iSingles
      .filter(i => !volTrackIds.includes(i.id))
      .map(i => ({ ...i, type: TrackType.SINGLE }));
    const singleAndVolTrackIds = [...volTrackIds, ...singles.map(i => i.id)];

    const articleTracks = iArticleTracks
      .filter(i => !singleAndVolTrackIds.includes(i.id))
      .map(i => ({ ...i, type: TrackType.ARTICLE_TRACK }));
    this.displayedItems = [...volTracks, ...singles, ...articleTracks];
  };

  /*
    @desc DisplayedItem
     */
  @observable
  private displayedItemId: Maybe<ID> = null;

  @observable
  public displayedItem: Maybe<Track> = null;

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

    this.displayedItem = this.displayedItems.find(
      i => i.id === this.displayedItemId
    ) as Track;
  };

  /*
  @desc update from CGI
   */
  @observable
  isFetching = false;

  @action
  public updateFromCGI = async () => {
    this.isFetching = true;
    this.ids = await ipc.user.fetchAndSaveLikedTracks();
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
  public toggleLike = async (
    type: TrackType,
    id: ID,
    fromID: ID,
    liked: boolean
  ) => {
    this.fetchIds.push(id);
    const startTime = Date.now();

    const [ids, error] = await promiseWrapper<number[]>(
      liked
        ? ipc.user.unlikeTrack(type, id, fromID)
        : ipc.user.likeTrack(type, id, fromID)
    );
    const MIN_TIME = 1000;
    const timeout = Date.now() - startTime < MIN_TIME ? MIN_TIME : 0;

    setTimeout(() => {
      if (error || !ids) {
        console.error(error);
        toast.warn(liked ? "取消收藏失败" : "曲目收藏失败");
      } else {
        this.ids = ids;
        toast.warn(liked ? "取消收藏成功" : "曲目收藏成功");
      }
      this.fetchIds = this.fetchIds.filter(i => i !== id);
    }, timeout);
  };
}

const collectionTrackStore = new CollectionTrack();

export { collectionTrackStore };
