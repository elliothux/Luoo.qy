import * as React from "react";
import classnames from "classnames";
import { noop } from "../../utils";

import "./index.scss";

interface Props {
  on: boolean;
  onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

function Toggle(props: Props) {
  return (
    <div
      onClick={props.onClick || noop}
      className={classnames({
        toggle: true,
        on: props.on
      })}
    >
      <div />
    </div>
  );
}

export { Toggle };
