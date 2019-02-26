import { action, computed, observable } from "mobx";
import { events, EventTypes, genRange, promiseWrapper } from "../utils";
import { ArticleInfo, ViewTypes } from "../types";
import { store } from "./index";

let ipc: IpcObject;

class ArticleStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;
    console.time('init article db');
    this.articles = await ipc.getArticles();
    console.timeEnd('init article db');
    setTimeout(() => {
      this.updateFromCGI().catch(console.error);
    }, 10);
  };

  @action
  private updateFromCGI = async () => {
    const latestArticle = await ipc.getLatestArticle();
    const [articles, error] = await promiseWrapper(
      ipc.requestArticles(latestArticle ? latestArticle.id + 1 : 0)
    );

    if (error) {
      throw error;
    }

    if (articles && articles.length > 0) {
      await ipc.saveArticles(articles);
    }

    this.articles = await ipc.getArticles();
  };

  @observable
  public articles: ArticleInfo[] = [];

  protected articlePageScale = 3 * 4;

  @observable
  public articleCurrentPage: number = 0;

  @computed
  public get articleTotalPage(): number {
    return Math.ceil(this.articles.length / this.articlePageScale);
  }

  @computed
  public get displayArticles(): ArticleInfo[] {
    const start = this.articleCurrentPage * this.articlePageScale;
    const end = Math.min(
      (this.articleCurrentPage + 1) * this.articlePageScale,
      this.articles.length
    );
    return this.articles.slice(start, end);
  }

  @action
  public toggleArticleIndex = (page: number) => {
    events.emit(EventTypes.ScrollBackSingles, true);
    this.articleCurrentPage = page;
  };

  protected paginationScale = 9;

  @observable
  public articlePaginationCurrentIndex: number = 0;

  @computed
  public get articlePaginationTotalIndex(): number {
    return Math.ceil(this.articleTotalPage / this.paginationScale);
  }

  @computed
  public get displayArticlePaginations(): number[] {
    const start = this.articlePaginationCurrentIndex * this.paginationScale;
    const end = Math.min(
      (this.articlePaginationCurrentIndex + 1) * this.paginationScale,
      this.articleTotalPage
    );
    return genRange(start, end);
  }

  @action
  public nextArticlePagination = () => {
    this.articlePaginationCurrentIndex += 1;
  };

  @action
  public preArticlePagination = () => {
    this.articlePaginationCurrentIndex -= 1;
  };

  @observable
  private selectedArticleIndex: number = 0;

  @computed
  public get selectedArticle(): ArticleInfo {
    return this.displayArticles[this.selectedArticleIndex];
  }

  @action
  public selectArticle = (articleIndex: number) => {
    this.selectedArticleIndex = articleIndex;
    store.changeView(ViewTypes.ARTICLE_INFO);
    store.changeBackground(ViewTypes.ARTICLES);
  };

  @action
  public selectArticleById = (articleId: number) => {
    if (
      articleId === this.selectedArticle.id &&
      store.view === ViewTypes.ARTICLE_INFO
    ) {
      return;
    }

    const articleIndex = this.articles.findIndex(i => i.id === articleId);
    const page = articleIndex % this.articlePageScale;
    const index = articleIndex - page * this.articlePageScale;
    this.articleCurrentPage = page;

    store.changeView(ViewTypes.ARTICLES, false, () => {
      setTimeout(() => events.emit(EventTypes.SelectArticle, index), 200);
    });
  };
}

const articleStore = new ArticleStore();

export { articleStore };
