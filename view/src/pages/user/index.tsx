import * as React from "react";
import { observer } from "mobx-react";
import { UserInfo, ViewTypes } from "../../@types";
import { Login } from "../../components/login";
// import { UserCollection } from "../../components/user-collection";
import { userStore } from "../../store";
import "./index.scss";
import { Icon, IconTypes } from "../../components/icon";

enum UserViewType {
  COLLECTION,
  OFFLINE,
  RADIO
}

@observer
class User extends React.Component {
  state = {
    view: UserViewType.COLLECTION
  };

  changeView = (view: UserViewType) => {
    this.setState({ view });
  };

  renderUser = () => {
    const { userInfo } = userStore;
    const { avatar, name } = userInfo as UserInfo;
    const { view } = this.state;

    return (
      <div id="user" className={`page view-${ViewTypes.USER}`}>
        <div id="user-header">
          <img src={avatar as string} alt="avatar" />
          <div>
            <p>{name}</p>
            <div id="user-header-nav">
              <div
                className={view === UserViewType.COLLECTION ? "active" : ""}
                onClick={this.changeView.bind(this, UserViewType.COLLECTION)}
              >
                <Icon type={IconTypes.STAR} />
                <span>收藏</span>
              </div>
              <div
                className={view === UserViewType.OFFLINE ? "active" : ""}
                onClick={this.changeView.bind(this, UserViewType.OFFLINE)}
              >
                <Icon type={IconTypes.CLOUD} />
                <span>离线</span>
              </div>
              <div
                className={view === UserViewType.RADIO ? "active" : ""}
                onClick={this.changeView.bind(this, UserViewType.RADIO)}
              >
                <Icon type={IconTypes.RADIO} />
                <span>电台</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { hasLogin } = userStore;
    if (!hasLogin) {
      return (
        <div id="user" className={`page view-${ViewTypes.USER}`}>
          <Login />
        </div>
      );
    }
    return this.renderUser();
  }
}

export { User };
