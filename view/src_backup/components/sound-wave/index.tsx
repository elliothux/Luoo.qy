import * as React from "react";
import classnames from "classnames";
import { genRange } from "../../utils";
import "./index.scss";

interface Props {
  isActive: boolean;
  show: boolean;
}

const range = genRange(0, 80);

function SoundWave(props: Props) {
  const { isActive, show } = props;
  return (
    <div
      className="sound-wave-container"
      style={{
        display: show ? "block" : "none"
      }}
    >
      <div
        className={classnames({
          "sound-wave": true,
          active: isActive
        })}
      >
        {range.map(i => (
          <i key={i} className="sound-wave-item" />
        ))}
      </div>
    </div>
  );
}

export { SoundWave };
