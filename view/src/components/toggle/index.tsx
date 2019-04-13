import * as React from "react";
import classnames from "classnames";

import "./index.scss";

interface Props {
  on: boolean;
  onToggle: (on: boolean) => void;
}

function Toggle(props: Props) {
  return (
    <div
      onClick={() => props.onToggle(!props.on)}
      className={classnames({
        toggle: true,
        on: props.on
      })}
    >
      <div />
    </div>
  );
}

export {
    Toggle
}