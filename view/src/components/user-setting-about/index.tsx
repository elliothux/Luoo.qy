import * as React from "react";
import { observer } from "mobx-react";
import "./index.scss";


function IUserSettingAbout() {
  return (
    <div id="user-setting-about">
      ABOUT
    </div>
  );
}

const UserSettingAbout = observer(IUserSettingAbout);

export { UserSettingAbout };
