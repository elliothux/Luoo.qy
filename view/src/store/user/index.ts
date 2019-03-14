import { action, computed, observable } from "mobx";
import { toast } from "react-toastify";
import { UserInfo } from "../../types";
import { getIPC } from "../../utils";
import { collectionVolStore } from "./collection-vol";

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
  private initCollection = async () => {
    await Promise.all([collectionVolStore.init()]);
  };

  @observable
  public userInfo: UserInfo = ipc.user.getUserInfo();

  @computed
  public get hasLogin(): boolean {
    return !!this.userInfo.id;
  }
}

const userStore = new UserStore();

export { userStore };
