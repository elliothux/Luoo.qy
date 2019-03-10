import { action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import {
  ArticleInfo,
  ArticleTrack,
  Single,
  UserInfo, ViewTypes,
  VolInfo,
  VolTrack
} from "../@types";
import {events, EventTypes, genRange, getIPC} from "../utils";
import {store, volStore} from "./index";

const ipc: IpcObject = getIPC();

function freeze<T>(items: T[]): ReadonlyArray<T> {
  return items.map(i => Object.freeze(i)) as ReadonlyArray<T>;
}

class UserStore {
  @action
  public init = () => {
    const userInfo: UserInfo = ipc.user.getUserInfos();
    if (userInfo.id) {
      this.userInfo = userInfo;
      this.initUserCollection();
      return toast.info(`"${userInfo.name}" 登录成功`);
    }
    return toast.info("未登录");
  };

  @action
  private initUserCollection = async () => {
    this.isFetching = true;
    await Promise.all([
      ipc.user.fetchAndSaveLikedVols(),
      ipc.user.fetchAndSaveLikedTracks(),
      ipc.user.fetchAndSaveLikedArticles()
    ]);
    await this.updateFromDB();
    this.isFetching = false;
  };

  @action
  updateFromDB = async () => {
    this.likedVols = freeze<VolInfo>(await ipc.db.vol.getLikedVols());
    this.likedVolTracks = freeze<VolTrack>(
      await ipc.db.vol.getLikedVolTracks()
    );
    this.likedSingles = freeze<Single>(await ipc.db.single.getLikedSingles());
    this.likedArticles = freeze<ArticleInfo>(
      await ipc.db.article.getLikedArticles()
    );
    this.likedArticleTracks = freeze<ArticleTrack>(
      await ipc.db.article.getLikedArticleTracks()
    );
  };

  @observable
  public userInfo: Maybe<UserInfo> = null;

  @computed
  public get hasLogin(): boolean {
    return !!this.userInfo;
  }

  @observable
  public isFetching: boolean = false;

  @observable
  public likedVolTracks: ReadonlyArray<VolTrack> = [];

  @observable
  public likedSingles: ReadonlyArray<Single> = [];

  @observable
  public likedArticles: ReadonlyArray<ArticleInfo> = [];

  @observable
  public likedArticleTracks: ReadonlyArray<ArticleTrack> = [];

  /*
  @desc: CollectionVols
   */

  @observable
  public likedVols: ReadonlyArray<VolInfo> = [];

  protected volPageScale = 3 * 4;

  @observable
  public volCurrentPage: number = 0;

  @computed
  public get volTotalPage(): number {
    return Math.ceil(this.likedVols.length / this.volPageScale);
  }

  @computed
  public get displayLikedVols(): VolInfo[] {
    const start = this.volCurrentPage * this.volPageScale;
    const end = Math.min(
        (this.volCurrentPage + 1) * this.volPageScale,
        this.likedVols.length
    );
    return this.likedVols.slice(start, end);
  }

  @action
  public toggleVolIndex = (page: number) => {
    events.emit(EventTypes.ScrollBackVols, true);
    this.volCurrentPage = page;
  };

  protected paginationScale = 9;

  @observable
  public volPaginationCurrentIndex: number = 0;

  @computed
  public get volPaginationTotalIndex(): number {
    return Math.ceil(this.volTotalPage / this.paginationScale);
  }

  @computed
  public get displayVolPaginations(): number[] {
    const start = this.volPaginationCurrentIndex * this.paginationScale;
    const end = Math.min(
        (this.volPaginationCurrentIndex + 1) * this.paginationScale,
        this.volTotalPage
    );
    return genRange(start, end);
  }

  @action
  public nextVolPagination = () => {
    this.volPaginationCurrentIndex += 1;
  };

  @action
  public preVolPagination = () => {
    this.volPaginationCurrentIndex -= 1;
  };

  @observable
  public selectedLikedVolIndex: number = 0;

  @computed
  public get selectedLikedVol(): VolInfo {
    return this.displayLikedVols[this.selectedLikedVolIndex];
  }

  @action
  public selectLikedVol = (volIndex: number) => {
    volStore.isShowCollection = true;
    this.selectedLikedVolIndex = volIndex;
    store.changeView(ViewTypes.VOL_INFO);
    store.changeBackground(ViewTypes.USER);
  };
}

const userStore = new UserStore();

export { userStore };
