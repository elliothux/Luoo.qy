import { action, computed, observable } from "mobx";
import { genRange } from "../utils";


type ChangePageListener = (page?: number, prePage?: number) => void;
const changePageListeners: ChangePageListener[] = [];

class Pagination {
  static from = (
    total: number,
    pageScale: number,
    paginationScale: number
  ): Pagination => {
    return new Pagination(total, pageScale, paginationScale);
  };

  private constructor(
    total: number,
    pageScale: number,
    paginationScale: number
  ) {
    this.PAGE_SCALE = pageScale;
    this.PAGINATION_SCALE = paginationScale;
    this.TOTAL = total;
  }

  /*
  @desc: page
   */
  private readonly TOTAL: number = 0;
  private readonly PAGE_SCALE: number = 0;
  private readonly PAGINATION_SCALE: number = 0;

  @observable
  public currentPage: number = 0;

  @computed
  public get totalPage(): number {
    return Math.ceil(this.TOTAL / this.PAGE_SCALE);
  }

  @computed
  public get start(): number {
    return this.currentPage * this.PAGE_SCALE;
  }

  @action
  public changeCurrentPage = (page: number) => {
    changePageListeners.forEach(callback => callback(page, this.currentPage));
    this.currentPage = page;
  };

  /*
  @desc: pagination
   */
  @observable
  private paginationCurrentIndex: number = 0;

  @computed
  private get paginationTotalIndex(): number {
    return Math.ceil(this.totalPage / this.PAGINATION_SCALE);
  }

  @computed
  public get displayPaginations(): number[] {
    const start = this.paginationCurrentIndex * this.PAGINATION_SCALE;
    const end = Math.min(
      (this.paginationCurrentIndex + 1) * this.PAGINATION_SCALE,
      this.totalPage
    );
    return genRange(start, end);
  }

  @action
  public nextPagination = () => {
    if (!this.hasNext) {
      return;
    }
    this.paginationCurrentIndex += 1;
  };

  @action
  public prePagination = () => {
    if (!this.hasPre) {
      return;
    }
    this.paginationCurrentIndex -= 1;
  };

  @computed
  public get hasNext(): boolean {
    return this.paginationCurrentIndex < this.paginationTotalIndex;
  }

  @computed
  public get hasPre(): boolean {
    return this.paginationCurrentIndex > 0;
  }

  /*
  @desc Listeners
   */
  public onChangePage = (callback: ChangePageListener) => {
    changePageListeners.push(callback);
  };
}

export { Pagination };
