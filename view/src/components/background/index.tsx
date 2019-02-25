import * as React from "react";
import { observer } from "mobx-react";
import { store } from "../../store";
import "./index.scss";

function IBackground() {
  return (
    <div id="bg">
      <div
        id="bg-img"
        style={{ backgroundImage: `url("${store.backgroundImage}")` }}
      />
    </div>
  );
}

const Background = observer(IBackground);

export { Background };
