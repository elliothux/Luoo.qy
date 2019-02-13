import { action, computed, observable } from "mobx";
import { genRange } from "../utils";
import {
  Article,
  ViewTypes,
} from "../types";
import { store } from "./index";

let ipc: IpcObject;

class ArticleStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;

    this.articles = await this.getArticlesFromDB();

    try {
      let articles: Article[] = await this.fetchArticles();
      if (articles.length > 0) {
        for (let article of articles) {
          await ipc.db.article.add(article);
          for (let track of article.tracks) {
            await ipc.db.articleTrack.add(track);
          }
        }
        this.articles = await this.getArticlesFromDB();

      }
    } catch (e) {
      console.error(e);
    }
  };

  @observable
  private articles: Article[] = [];

  private getArticlesFromDB = (): Promise<Article[]> => {
    return ipc.db.article.get();
  };

  private fetchArticles = async (): Promise<Article[]> => {
    try {
      const latest: number = await ipc.db.article.latest();
      const { data } = await ipc.requestArticles(latest + 1);
      return data.sort((i: Article, j: Article) => j.id - i.id);
    } catch (e) {
      throw e;
    }
  };

  protected articlePageScale = 3 * 4;

  @observable
  public articleCurrentPage: number = 0;

  @computed
  public get articleTotalPage(): number {
    return Math.ceil(this.articles.length / this.articlePageScale);
  }

  @computed
  public get displayVols(): Article[] {
    const start = this.articleCurrentPage * this.articlePageScale;
    const end = Math.min(
      (this.articleCurrentPage + 1) * this.articlePageScale,
      this.articles.length
    );
    return this.articles.slice(start, end);
  }

  @action
  public toggleArticleIndex = (page: number) => {
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
  public nextVolPagination = () => {
    this.articlePaginationCurrentIndex += 1;
  };

  @action
  public preVolPagination = () => {
    this.articlePaginationCurrentIndex -= 1;
  };

  @observable
  private selectedArticleIndex: number = 0;

  @computed
  public get selectedArticle(): Article {
    return this.displayVols[this.selectedArticleIndex];
  }

  @action
  public selectArticle = (articleIndex: number) => {
    this.selectedArticleIndex = articleIndex;
    store.changeView(ViewTypes.VOL_INFO);
  };

  @observable
  public playingArticleIndex: number = 0;

  @observable
  public playingTrackIndex: number = 0;
}

const articleStore = new ArticleStore();

export { articleStore };
