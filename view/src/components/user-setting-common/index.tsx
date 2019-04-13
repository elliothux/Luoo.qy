import * as React from "react";
import { observer } from "mobx-react";
import "./index.scss";


function IUserSettingCommon() {
  return (
    <div id="user-setting-common">
      COMMON
    </div>
  );
}

const UserSettingCommon = observer(IUserSettingCommon);

export { UserSettingCommon };
