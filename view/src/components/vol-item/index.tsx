import * as React from "react";
import { VolInfo } from "../../types";

import "./index.scss";


export interface Props {
  volInfo: VolInfo;
}

function VolItem(props: Props) {
  const { volInfo } = props;
  return (
      <div className="vol-item">
          {/*<div className="vol-item-cover" style={{ backgroundImage: `url(${volInfo.cover})` }}/>*/}
          <img className="vol-item-cover" src={volInfo.cover} />
          <div className="vol-item-info">
              <p className="vol-item-info-index"><span>Vol.</span>{volInfo.vol}</p>
              <p className="vol-item-info-title">{volInfo.title}</p>
          </div>
          <div className="vol-item-bg" style={{ backgroundColor: volInfo.color }}/>
      </div>
  );
}

export { VolItem };
