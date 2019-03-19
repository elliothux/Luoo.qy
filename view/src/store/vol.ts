import { action, computed, observable, reaction } from "mobx";
import {getIPC, noop} from "../utils";
import {
  TrackType,
  ViewTypes,
  VolInfo,
  VolType,
  VolTypeItem,
  VolTypesMap
} from "../types";
import { Pagination } from "./pagination";
import {playerStore, store} from "./index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class VolStore {
  constructor() {
    this.initReaction();
  }
  /*
  @desc Init
   */
  public init = async () => {
    await this.updateTotal();
  };

  private initReaction = () => {
    // observer for total
    reaction(() => this.type, this.updateTotal);
    // observer for vols
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start } = this.pagination;
      return [this.total, this.type, start];
    }, this.updateDisplayedItems);
    // observer for vol
    reaction(() => this.displayedItemId, this.updateDisplayedItem);
    // observer for cover
    reaction(() => this.displayedItem ? this.displayedItem.cover : null, () => {
      if (store.view === ViewTypes.VOL_INFO && this.displayedItem) {
        store.setBackgroundImage(this.displayedItem.cover);
      }
    });
  };

  /*
  @desc Pagination
   */
  @observable
  private total: Maybe<number> = null;

  @action
  private updateTotal = async () => {
    this.total = await ipc.db.vol.count(
      this.type === VolType.All
        ? {}
        : { tags: { $elemMatch: this.typeItem.name } }
    );
  };

  @computed
  public get pagination(): Pagination {
    return Pagination.from(this.total || 0, PAGE_SCALE, PAGINATION_SCALE);
  }

  /*
  @desc Type
   */
  @observable
  public type: VolType = VolType.All;

  @computed
  public get typeItem(): VolTypeItem {
    return VolTypesMap.get(this.type) as VolTypeItem;
  }

  @action
  public setType = (type: VolType) => {
    this.type = type;
    this.changeVolTypeListener();
    store.changeView(ViewTypes.VOLS);
  };

  @observable
  public showVolTypes: boolean = false;

  @action
  public toggleShowVolTypes = (show: boolean) => {
    this.showVolTypes = show;
  };

  private changeVolTypeListener: Callback = noop;

  public onChangeVolType = (listener: Callback) => {
    this.changeVolTypeListener = listener;
  };

  /*
  @desc DisplayedItems
   */
  @observable
  public displayedItems: Maybe<VolInfo[]> = null;

  @action
  private updateDisplayedItems = async () => {
    // this.displayedItems = null;

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
    const tracks = (await ipc.db.volTrack.find({
      query: { volId: volInfo.id },
      sort: { id: -1 }
    })).map(i => ({ ...i, type: TrackType.VOL_TRACK }));
    this.displayedItem = {
      ...volInfo,
      tracks
    } as VolInfo;
  };
}

const volStore = new VolStore();

export { volStore };
