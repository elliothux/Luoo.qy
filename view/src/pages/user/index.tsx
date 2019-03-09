import * as React from "react";
import { observer } from "mobx-react";
import { ViewTypes } from "../../@types";
import { Login } from "../../components/login";
import { UserCollection } from "../../components/user-collection";
import { userStore } from "../../store";
import "./index.scss";

function IUser() {
  const { hasLogin } = userStore;
  return (
    <div id="user" className={`page view-${ViewTypes.USER}`}>
      {hasLogin ? <UserCollection /> : <Login />}
    </div>
  );
}

const User = observer(IUser);

export { User };
