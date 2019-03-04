import * as React from "react";
import { observer } from "mobx-react";
import { ViewTypes} from "../../@types";
import "./index.scss";

function IUser() {
    return (
        <div
            id="user"
            className={`page view-${ViewTypes.USER}`}
        >
            <h1>User</h1>
        </div>
    );
}

const User = observer(IUser);

export { User };
