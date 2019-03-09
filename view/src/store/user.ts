import { action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import {
  ArticleInfo,
  ArticleTrack,
  Single,
  UserInfo,
  VolInfo,
  VolTrack
} from "../@types";
import { getIPC } from "../utils";

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
  private likedVols: ReadonlyArray<VolInfo> = [];

  @observable
  private likedVolTracks: ReadonlyArray<VolTrack> = [];

  @observable
  private likedSingles: ReadonlyArray<Single> = [];

  @observable
  private likedArticles: ReadonlyArray<ArticleInfo> = [];

  @observable
  private likedArticleTracks: ReadonlyArray<ArticleTrack> = [];
}

const userStore = new UserStore();

export { userStore };
