import { action, computed, observable } from "mobx";
import { genRange } from "../utils";
import { ViewTypes, Single } from "../types";
import { store } from "./index";

let ipc: IpcObject;

class SingleStore {
  @action
  init = async (IPC: IpcObject) => {
    ipc = IPC;

    this.singles = await this.getSinglesFromDB();

    try {
      let singles = await this.fetchSingles();
      if (singles.length > 0) {
        for (let single of singles) {
          await ipc.db.single.add(single);
        }
        this.singles = await this.getSinglesFromDB();
      }
    } catch (e) {
      console.error(e);
    }
  };

  @observable
  public singles: Single[] = [];

  private getSinglesFromDB = (): Promise<Single[]> => {
    return ipc.db.single.get();
  };

  private fetchSingles = async (): Promise<Single[]> => {
    try {
      const latest: number = await ipc.db.single.latest();
      const { data } = await ipc.requestSingles(latest + 1);
      // TODO: REMOVE after Typescript fix issue: https://github.com/Microsoft/TypeScript/issues/5710
      return data.sort((i: Single, j: Single) => +j.date - +i.date);
    } catch (e) {
      throw e;
    }
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

  @observable
  public playingSingleIndex: number = 0;
}

const singleStore = new SingleStore();

export { singleStore };
