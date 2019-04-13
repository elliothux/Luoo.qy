import { action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { UserInfo } from "../../types";
import { getIPC } from "../../utils";
import { collectionVolStore } from "./collection-vol";
import { collectionTrackStore } from "./collection-track";
import { collectionArticleStore } from "./collection-article";
import { settingStore } from "./setting";

const ipc: IpcObject = getIPC();

class UserStore {
  @action
  public init = async () => {
    this.userInfo = ipc.user.getUserInfo();
    if (!this.userInfo.id) {
      return toast.info("未登录");
    }

    await this.initCollection();
    return toast.info(`"${this.userInfo.name}" 登录成功`);
  };

  @action
  private initCollection = () => {
    return Promise.all([
      collectionVolStore.init(),
      collectionTrackStore.init(),
      collectionArticleStore.init()
    ]);
  };

  @observable
  public userInfo: UserInfo = ipc.user.getUserInfo();

  @computed
  public get hasLogin(): boolean {
    return !!this.userInfo.id;
  }
}

const userStore = new UserStore();

export {
  userStore,
  collectionVolStore,
  collectionTrackStore,
  collectionArticleStore,
  settingStore
};
