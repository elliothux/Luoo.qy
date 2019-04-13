import * as React from "react";
import { observer } from "mobx-react";
import { UserInfo, ViewTypes } from "../../types";
import { Login } from "../../components/login";
import { Icon, IconTypes } from "../../components/icon";
import { UserCollection } from "../../components/user-collection";
import { UserOffline } from "../../components/user-offline";
import { UserRadio } from "../../components/user-radio";
import { UserSetting } from "../../components/user-setting";
import { store, userStore } from "../../store";
import "./index.scss";
import { Route } from "../../components/route";

enum UserViewTypes {
  COLLECTION,
  OFFLINE,
  RADIO,
  SETTING
}

@observer
class User extends React.Component {
  state = {
    view: UserViewTypes.COLLECTION
  };

  get translateX(): string {
    const { view } = this.state;
    switch (view) {
      case UserViewTypes.COLLECTION:
        return `0%`;
      case UserViewTypes.OFFLINE:
        return `-25%`;
      case UserViewTypes.RADIO:
        return `-50%`;
      case UserViewTypes.SETTING:
        return `-75%`;
      default:
        throw new Error("Invalid view type");
    }
  }

  changeView = (view: UserViewTypes) => {
    this.setState({ view });
  };

  renderHeader = () => {
    const { userInfo } = userStore;
    const { avatar, name, id } = userInfo as UserInfo;
    const { view } = this.state;

    return (
      <div id="user-header">
        <div id="user-header-nav">
          <div
            className={view === UserViewTypes.COLLECTION ? "active" : ""}
            onClick={this.changeView.bind(this, UserViewTypes.COLLECTION)}
          >
            <Icon type={IconTypes.STAR} />
            <span>收藏</span>
          </div>
          <div
            className={view === UserViewTypes.OFFLINE ? "active" : ""}
            onClick={this.changeView.bind(this, UserViewTypes.OFFLINE)}
          >
            <Icon type={IconTypes.CLOUD} />
            <span>离线</span>
          </div>
          <div
            className={view === UserViewTypes.RADIO ? "active" : ""}
            onClick={this.changeView.bind(this, UserViewTypes.RADIO)}
          >
            <Icon type={IconTypes.RADIO} />
            <span>电台</span>
          </div>
          <div
              className={view === UserViewTypes.SETTING ? "active" : ""}
              onClick={this.changeView.bind(this, UserViewTypes.SETTING)}
          >
            <Icon type={IconTypes.SETTING} />
            <span>设置</span>
          </div>
        </div>
        <div id="user-header-info">
          <p>
            {name}
            <br />
            <span>ID: {id}</span>
          </p>
          <img src={avatar as string} alt="avatar" />
        </div>
      </div>
    );
  };

  renderUser = () => {
    return (
      <Route currentView={store.view} view={ViewTypes.USER} id="user">
        <div id="user-container">
          {this.renderHeader()}
          <div
            id="user-content"
            style={{
              transform: `translateX(${this.translateX})`
            }}
          >
            <UserCollection />
            <UserOffline />
            <UserRadio />
            <UserSetting />
          </div>
        </div>
      </Route>
    );
  };

  render() {
    const { hasLogin } = userStore;
    if (!hasLogin) {
      return (
        <Route currentView={store.view} view={ViewTypes.USER} id="user">
          <Login />
        </Route>
      );
    }
    return this.renderUser();
  }
}

export { User };
