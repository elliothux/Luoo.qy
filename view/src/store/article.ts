import {action, computed, observable, reaction} from "mobx";
import {getIPC} from "../utils";
import {ArticleInfo, ViewTypes} from "../types";
import {Pagination} from "./pagination";
import {store} from "./index";

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
  public get pagination(): Maybe<Pagination> {
    return this.total
      ? Pagination.from(this.total, PAGE_SCALE, PAGINATION_SCALE)
      : null;
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
        date: 0,
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
    const tracks = await ipc.db.articleTrack.find({ query: { articleId: articleInfo.id } });
    this.displayedItem = {
      ...articleInfo,
      tracks
    } as ArticleInfo;
  };
}

const articleStore = new ArticleStore();

export { articleStore };
