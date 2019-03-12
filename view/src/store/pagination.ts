import { action, computed, observable } from "mobx";
import { genRange } from "../utils";

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
  private currentPage: number = 0;

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
    this.paginationCurrentIndex += 1;
  };

  @action
  public prePagination = () => {
    this.paginationCurrentIndex -= 1;
  };

  @computed
  public get hasNextPagination(): boolean {
    return this.paginationCurrentIndex < this.paginationTotalIndex;
  }

  @computed
  public get hasPrePagination(): boolean {
    return this.paginationCurrentIndex > 0;
  }
}

export { Pagination };
