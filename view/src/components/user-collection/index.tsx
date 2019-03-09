import * as React from "react";
import {observer} from "mobx-react";
import { userStore } from "../../store";
import "./index.scss";
import {UserInfo} from "../../@types";

@observer
class UserCollection extends React.Component {
  static renderFetching = () => {
    return <div id="user-collection-fetching">加载中。。。</div>;
  };

  render() {
    const { isFetching, userInfo } = userStore;
    if (isFetching) {
      return UserCollection.renderFetching();
    }

    const { avatar, name } = userInfo as UserInfo;
    return (
      <div id="user-collection">
        <img src={avatar as string} alt="avatar" />
        {name}
      </div>
    );
  }
}

export { UserCollection };
