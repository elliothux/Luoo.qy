import * as React from "react";
import { Single } from "../../types";
import { Icon, IconTypes } from "../icon";
import { volStore } from "../../store";
import { events, EventTypes, px } from "../../utils";
import "./index.scss";

export interface Props {
  singleInfo: Single;
  index: number;
}

class SingleItem extends React.Component<Props> {
  private onClick = () => {};

  public render() {
    const { singleInfo } = this.props;
    return (
      <div className="single-item" onClick={this.onClick}>
        <div
          className="single-item-cover"
          style={{
            backgroundImage: `url(${singleInfo.cover})`
          }}
        />

        <div className="single-item-info">
          <p className="single-item-info-name">{singleInfo.name}</p>
          <div className="single-item-operation">
            <Icon type={IconTypes.LIKE} />
            <Icon type={IconTypes.PLAY} />
          </div>
        </div>
        <div className="vol-item-tags">
            {volInfo.tags.map(t => (
                <span key={t}>#{t}</span>
            ))}
        </div>
        <div
          className="vol-item-bg"
          style={{ backgroundColor: volInfo.color }}
        />
      </div>
      </div>
    );
  }
}

export { SingleItem };
