import { action, computed, observable } from "mobx";
import { events, genRange } from "../utils";
import { ViewTypes, Single } from "../types";
import { EventTypes } from "../utils";
import { store } from "./index";

let ipc: IpcObject;

class SingleStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;
    this.singles = await this.getSinglesFromDB();
  };

  @observable
  public singles: Single[] = [];

  private getSinglesFromDB = (): Promise<Single[]> => {
    return Promise.resolve([]);
  };

  private fetchSingles = async (): Promise<Single[]> => {
    return Promise.resolve([]);
  };

  protected singlePageScale = 3 * 4;

  @observable
  public singleCurrentPage: number = 0;

  @computed
  public get singleTotalPage(): number {
    return Math.ceil(this.singles.length / this.singlePageScale);
  }

  @computed
  public get displaySingles(): Single[] {
    const start = this.singleCurrentPage * this.singlePageScale;
    const end = Math.min(
      (this.singleCurrentPage + 1) * this.singlePageScale,
      this.singles.length
    );
    return this.singles.slice(start, end);
  }

  @action
  public toggleSingleIndex = (page: number) => {
    events.emit(EventTypes.ScrollBackSingles, true);
    this.singleCurrentPage = page;
  };

  protected paginationScale = 9;

  @observable
  public singlePaginationCurrentIndex: number = 0;

  @computed
  public get singlePaginationTotalIndex(): number {
    return Math.ceil(this.singleTotalPage / this.paginationScale);
  }

  @computed
  public get displaySinglePaginations(): number[] {
    const start = this.singlePaginationCurrentIndex * this.paginationScale;
    const end = Math.min(
      (this.singlePaginationCurrentIndex + 1) * this.paginationScale,
      this.singleTotalPage
    );
    return genRange(start, end);
  }

  @action
  public nextSinglePagination = () => {
    this.singlePaginationCurrentIndex += 1;
  };

  @action
  public preSinglePagination = () => {
    this.singlePaginationCurrentIndex -= 1;
  };

  @observable
  private selectedSingleIndex: number = 0;

  @computed
  public get selectedSingle(): Single {
    return this.displaySingles[this.selectedSingleIndex];
  }

  @action
  public selectSingle = (singleIndex: number) => {
    this.selectedSingleIndex = singleIndex;
    store.changeView(ViewTypes.SINGLE_INFO);
    store.changeBackground(ViewTypes.SINGLES);
  };

  @action
  public selectSingleById = (singleId: number) => {
    if (
      singleId === this.selectedSingle.id &&
      store.view === ViewTypes.SINGLE_INFO
    ) {
      return;
    }

    const singleIndex = this.singles.findIndex(i => i.id === singleId);
    const page = singleId % this.singlePageScale;
    const index = singleIndex - page * this.singlePageScale;
    this.singleCurrentPage = page;

    store.changeView(ViewTypes.SINGLES, false, () => {
      setTimeout(() => events.emit(EventTypes.SelectSingle, index), 200);
    });
  };
}

const singleStore = new SingleStore();

export { singleStore };
