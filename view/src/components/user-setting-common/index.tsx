import * as React from "react";
import {observer} from "mobx-react";
import {Toggle} from "../toggle";

import "./index.scss";
import {Icon, IconTypes} from "../icon";

function IUserSettingCommon() {
  return (
    <div id="user-setting-common">
      <div className="user-setting-line">
        <Icon type={IconTypes.DOWNLOAD_FOLDER} />
        <span className="user-setting-title">下载路径：</span>
        <span>/Users/qingyang/Desktop/Luoo.qy</span>
      </div>
      <div className="user-setting-line">
        <Toggle on={false} onToggle={console.log} />
        <span className="user-setting-title">自动更新：</span>
          <span>禁用</span>
      </div>
      <div className="user-setting-line">
        <Toggle on={true} onToggle={console.log} />
        <span className="user-setting-title">推送通知：</span>
          <span>启用</span>
      </div>
        <div>
            <div className="user-setting-item">
                <Icon type={IconTypes.LOGOUT}/>
                <span>退出登录</span>
            </div>
            <div className="user-setting-item">
                <Icon type={IconTypes.UPGRADE}/>
                <span>检查更新</span>
            </div>
            <div className="user-setting-item">
                <Icon type={IconTypes.WEBSITE}/>
                <span>访问网站</span>
            </div>
        </div>
    </div>
  );
}

const UserSettingCommon = observer(IUserSettingCommon);

export { UserSettingCommon };
