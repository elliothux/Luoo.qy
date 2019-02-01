import * as React from "react";
import BG from "../../static/fake-bg.jpg";
import "./index.scss";

function Background() {
  return (
    <div id="bg">
      <div id="bg-mask" />
      <div id="bg-img" style={{ backgroundImage: `url("${BG}")` }} />
    </div>
  );
}

export { Background };
