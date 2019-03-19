import { action, computed, observable, reaction } from "mobx";
import { getIPC } from "../utils";
import { ArticleInfo, TrackType, ViewTypes } from "../types";
import { Pagination } from "./pagination";
import { store } from "./index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class ArticleStore {
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
    // observer for articles
    reaction(() => {
      if (!this.pagination) {
        return null;
      }
      const { start } = this.pagination;
      return [this.total, start];
    }, this.updateDisplayedItems);
    // observer for article
    reaction(() => this.displayedItemId, this.updateDisplayedItem);
    // observer for cover
    reaction(() => this.displayedItem ? this.displayedItem.cover : null, () => {
      if (store.view === ViewTypes.ARTICLE_INFO && this.displayedItem) {
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
    this.total = await ipc.db.article.count();
  };

  @computed
  public get pagination(): Pagination {
    return Pagination.from(this.total || 0, PAGE_SCALE, PAGINATION_SCALE);
  }

  /*
  @desc DisplayedItems
   */
  @observable
  public displayedItems: Maybe<ArticleInfo[]> = null;

  @action
  private updateDisplayedItems = async () => {
    if (!this.pagination) {
      return;
    }

    this.displayedItems = await ipc.db.article.find<ArticleInfo>({
      skip: this.pagination.start,
      limit: PAGE_SCALE,
      sort: { id: -1 },
      projection: {
        url: 0,
        desc: 0,
        author: 0,
        authorAvatar: 0,
        date: 0
      }
    });
  };

  /*
  @desc DisplayedItem
   */
  @observable
  private displayedItemId: Maybe<ID> = null;

  @observable
  public displayedItem: Maybe<ArticleInfo> = null;

  @action
  public setItem = (id: ID) => {
    this.displayedItemId = id;
    store.changeView(ViewTypes.ARTICLE_INFO);
  };

  @action
  public updateDisplayedItem = async () => {
    if (!this.displayedItemId) {
      return;
    }

    const articleInfo = (await ipc.db.article.findOne({
      id: this.displayedItemId
    })) as ArticleInfo;
    const tracks = (await ipc.db.articleTrack.find({
      query: { articleId: articleInfo.id },
      sort: { id: -1 }
    })).map(i => ({ ...i, type: TrackType.ARTICLE_TRACK }));
    this.displayedItem = {
      ...articleInfo,
      tracks
    } as ArticleInfo;
  };
}

const articleStore = new ArticleStore();

export { articleStore };
