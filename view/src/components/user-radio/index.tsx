import * as React from "react";
import {observer} from "mobx-react";
import { userStore } from "../../store";
import "./index.scss";

@observer
class UserRadio extends React.Component {
  static renderFetching = () => {
    return <div id="user-fetching">加载中。。。</div>;
  };

  render() {
    const { isFetching } = userStore;
    if (isFetching) {
      return UserRadio.renderFetching();
    }
    return (
      <div id="user-radio">
        RADIO
      </div>
    );
  }
}

export { UserRadio };
