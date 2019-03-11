import * as React from "react";
import {observer} from "mobx-react";
import { userStore } from "../../store";
import "./index.scss";
import {Loading} from "../loading";

@observer
class UserRadio extends React.Component {
  render() {
    const { isFetching } = userStore;
    if (isFetching) {
      return <Loading />;
    }
    return (
      <div id="user-radio">
        RADIO
      </div>
    );
  }
}

export { UserRadio };
