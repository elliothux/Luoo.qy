import { action, observable, toJS } from "mobx";
import { getIPC } from "../../utils";
import { UserSettings } from "../../types";

const ipc = getIPC();

class SettingStore {
  @observable
  public setting: UserSettings = observable({...ipc.user.getUserSettings()});

  @action
  public setSetting = (key: keyof UserSettings, value: string | boolean) => {
    const { setting } = this;
    (setting[key] as any) = value;
    ipc.user.setUserSetting(key, value);
  };
}

const settingStore = new SettingStore();

export { settingStore };
