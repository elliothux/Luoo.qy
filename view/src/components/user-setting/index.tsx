import * as React from "react";
import { observer } from "mobx-react";
import { UserSettingCommon } from "../user-setting-common";
import { UserSettingAbout} from "../user-setting-about";
import "./index.scss";


enum UserSettingViewTypes {
  COMMON,
  ABOUT
}

@observer
class UserSetting extends React.Component {
  state = {
    view: UserSettingViewTypes.COMMON
  };

  get translateX(): string {
    const { view } = this.state;
    switch (view) {
      case UserSettingViewTypes.COMMON:
        return `0%`;
      case UserSettingViewTypes.ABOUT:
        return `-50%`;
      default:
        throw new Error("Invalid view type");
    }
  }

  changeView = (view: UserSettingViewTypes) => {
    this.setState({ view });
  };

  renderHeader = () => {
    const { view } = this.state;
    return (
        <div id="user-setting-header">
          <div
              className={view === UserSettingViewTypes.COMMON ? "active" : ""}
              onClick={this.changeView.bind(this, UserSettingViewTypes.COMMON)}
          >
            通用
          </div>
          <div
              className={view === UserSettingViewTypes.ABOUT ? "active" : ""}
              onClick={this.changeView.bind(this, UserSettingViewTypes.ABOUT)}
          >
            关于
          </div>
        </div>
    );
  };

  renderSetting = () => {
    return (
        <div
            id="user-setting-container"
            style={{
              transform: `translateX(${this.translateX})`
            }}
        >
          <UserSettingCommon/>
          <UserSettingAbout/>
        </div>
    );
  };

  render() {
    return (
        <div id="user-setting">
          {this.renderHeader()}
          {this.renderSetting()}
        </div>
    );
  }
}

export { UserSetting };
