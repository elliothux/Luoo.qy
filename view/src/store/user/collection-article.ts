import { action, computed, observable, reaction } from "mobx";
import { toast } from "react-toastify";
import { exec, getIPC, promiseWrapper } from "../../utils";
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
    // exec(this.updateFromCGI);
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

  public isLiked = (id: ID): boolean => {
    return this.ids.includes(id);
  };

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
      query: { articleId: articleInfo.id },
      sort: { id: -1 }
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
    this.ids = await ipc.user.fetchAndSaveLikedArticles();
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

    const [ids, error] = await promiseWrapper<number[]>(liked
        ? ipc.user.unlikeArticle(id)
        : ipc.user.likeArticle(id));
    const MIN_TIME = 1000;
    const timeout = Date.now() - startTime < MIN_TIME ? MIN_TIME : 0;

    setTimeout(() => {
      if (error || !ids) {
        console.error(error);
        toast.warn(liked ? "取消收藏失败" : "专栏收藏失败");
      } else {
        this.ids = ids;
        toast.warn(liked ? "取消收藏成功" : "专栏收藏成功");
      }
      this.fetchIds = this.fetchIds.filter(i => i !== id);
    }, timeout);
  };
}

const collectionArticleStore = new CollectionArticle();

export { collectionArticleStore };
