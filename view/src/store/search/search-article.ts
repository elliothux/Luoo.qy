import { action, computed, observable, reaction } from "mobx";
import { Pagination } from "../pagination";
import {ArticleInfo} from "../../types";
import {getIPC} from "../../utils";

const PAGE_SCALE = 3 * 4;
const PAGINATION_SCALE = 9;


const ipc = getIPC();

class SearchArticle {
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
  private ids: Maybe<ID[]> = null;

  public getIds = (): ID[] => {
    return this.ids || [];
  };

  @action
  public setIds = (ids: Maybe<ID[]>) => {
    this.ids = ids
  };

  @computed
  public get isLoading(): boolean {
    return !this.ids;
  }

  @computed
  private get total(): number {
    return (this.ids || []).length;
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
}

const searchArticleStore = new SearchArticle();

export { searchArticleStore };
