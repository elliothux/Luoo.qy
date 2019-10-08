import * as React from "react";
import { observer } from "mobx-react";
import { Toggle } from "../toggle";
import { Icon, IconTypes } from "../icon";
import { settingStore } from "../../store/user";

import "./index.scss";
import { exec, getRemote } from "../../utils";

function toggleAutoUpdate() {
  settingStore.setSetting("autoUpdate", !settingStore.setting.autoUpdate);
}

function togglePushNotifications() {
  settingStore.setSetting(
    "pushNotifications",
    !settingStore.setting.pushNotifications
  );
}

function selectDownloadFolder() {
  exec(async () => {
    const remote = getRemote();
    const { filePaths: folder} = await remote.dialog.showOpenDialog({
      title: "选择文件夹",
      defaultPath: settingStore.setting.downloadFolder,
      properties: ["openDirectory", "createDirectory", "promptToCreate"]
    });
    if (!folder || !folder.length) {
      return;
    }
    settingStore.setSetting("downloadFolder", folder[0]);
  });
}

function IUserSettingCommon() {
  const {
    downloadFolder,
    pushNotifications,
    autoUpdate
  } = settingStore.setting;

  return (
    <div id="user-setting-common">
      <div className="user-setting-line" onClick={selectDownloadFolder}>
        <Icon type={IconTypes.DOWNLOAD_FOLDER} />
        <span className="user-setting-title">下载路径：</span>
        <span>{downloadFolder}</span>
      </div>
      <div className="user-setting-line" onClick={toggleAutoUpdate}>
        <Toggle on={autoUpdate} />
        <span className="user-setting-title">自动更新：</span>
        <span>{autoUpdate ? "启用" : "禁用"}</span>
      </div>
      <div className="user-setting-line" onClick={togglePushNotifications}>
        <Toggle on={pushNotifications} />
        <span className="user-setting-title">推送通知：</span>
        <span>{pushNotifications ? "启用" : "禁用"}</span>
      </div>
      <div>
        <div className="user-setting-item">
          {/*<Icon type={IconTypes.TRASH} />*/}
          <span>清除搜索历史</span>
        </div>
        <div className="user-setting-item">
          <Icon type={IconTypes.LOGOUT} />
          <span>退出登录</span>
        </div>
        <div className="user-setting-item">
          <Icon type={IconTypes.UPGRADE} />
          <span>检查更新</span>
        </div>
        <div className="user-setting-item">
          <Icon type={IconTypes.WEBSITE} />
          <span>访问网站</span>
        </div>
      </div>
    </div>
  );
}

const UserSettingCommon = observer(IUserSettingCommon);

export { UserSettingCommon };
