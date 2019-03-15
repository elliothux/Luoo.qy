import {action, computed, observable, reaction, toJS} from "mobx";
import {exec, getIPC, uniqueBy} from "../../utils";
import { Pagination } from "../pagination";
import { ViewTypes, Track, FindOptions } from "../../types";
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
    const [volTracks, singles, articleTracks] = await Promise.all([
      ipc.db.volTrack.find<Track>(options),
      ipc.db.single.find<Track>(options),
      ipc.db.articleTrack.find<Track>(options)
    ]);
    this.displayedItems = uniqueBy<Track>(
        [...volTracks, ...singles, ...articleTracks],
        i => String(i.id)
    );
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
}

const collectionTrackStore = new CollectionTrack();

export { collectionTrackStore };
