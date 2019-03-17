import { action, computed, observable, reaction } from "mobx";
import { exec, getIPC } from "../../utils";
import { Pagination } from "../pagination";
import { ArticleInfo, ViewTypes } from "../../types";
import { store } from "../index";

const ipc: IpcObject = getIPC();
const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;

class CollectionArticle {
  constructor() {
    this.initReaction();
  }
  /*
    @desc Init
     */
  public init = async () => {
    this.ids = ipc.user.getUserLikedArticleIds();
    if (!this.ids.length) {
      exec(this.updateFromCGI);
    }
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
  public displayedItems: ArticleInfo[] = [];

  @action
  private updateDisplayedItems = async () => {
    this.displayedItems = await ipc.db.article.find<ArticleInfo>({
      skip: this.pagination.start,
      limit: PAGE_SCALE,
      query: { id: { $in: this.ids } },
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
    store.changeView(ViewTypes.VOL_INFO);
  };

  @action
  public updateDisplayedItem = async () => {
    if (!this.displayedItemId) {
      return;
    }

    const articleInfo = (await ipc.db.article.findOne({
      id: this.displayedItemId
    })) as ArticleInfo;
    const tracks = await ipc.db.articleTrack.find({
      query: { articleId: articleInfo.id }
    });
    this.displayedItem = {
      ...articleInfo,
      tracks
    } as ArticleInfo;
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
}

const collectionArticleStore = new CollectionArticle();

export { collectionArticleStore };
