import * as React from "react";
import { observer } from "mobx-react";
import { ViewTypes} from "../../@types";
import {Login} from "../../components/login";
import "./index.scss";

function IUser() {
    return (
        <div
            id="user"
            className={`page view-${ViewTypes.USER}`}
        >
            <Login />
        </div>
    );
}

const User = observer(IUser);

export { User };
