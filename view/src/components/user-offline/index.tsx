import * as React from "react";
import { observer } from "mobx-react";
import { userStore } from "../../store";
import "./index.scss";
import { Loading } from "../loading";

@observer
class UserOffline extends React.Component {
  render() {
    return <div id="user-offline">OFFLINE</div>;
  }
}

export { UserOffline };
