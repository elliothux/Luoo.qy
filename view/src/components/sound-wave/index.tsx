import * as React from "react";
import classnames from "classnames";
import "./index.scss";
import { genRange } from "../../utils";

interface Props {
  isActive: boolean;
}

const range = genRange(0, 80);

function SoundWave(props: Props) {
  const { isActive } = props;
  return (
    <div className="sound-wave-container">
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
