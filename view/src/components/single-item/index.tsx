import * as React from "react";
import { Single } from "../../types";
import { Icon, IconTypes } from "../icon";
import { singleStore, volStore } from "../../store";
import { events, EventTypes, px } from "../../utils";
import "./index.scss";

export interface Props {
  singleInfo: Single;
  index: number;
}

class SingleItem extends React.Component<Props> {
  private coverRef: HTMLImageElement | null = null;

  private getCoverRef = (i: HTMLImageElement | null) => {
    if (i) {
      this.coverRef = i;
    }
  };

  private onClick = () => {
    events.emit(
      EventTypes.ShowSingleBackground,
      this.props.singleInfo.cover,
      this.coverRef,
      () => singleStore.selectSingle(this.props.index)
    );
  };

  public render() {
    const { singleInfo, index } = this.props;
    return (
      <div key={index} className="single-item" onClick={this.onClick}>
        <div
          ref={this.getCoverRef}
          className="single-item-cover"
          style={{
            backgroundImage: `url(${singleInfo.cover})`
          }}
        />
        <div className="single-item-info">
          <div className="single-item-info-container">
            <p className="single-item-info-name">{singleInfo.name}</p>
            <p className="single-item-info-artist">{singleInfo.artist}</p>
          </div>
          <div className="single-item-operation">
            <Icon type={IconTypes.LIKE} />
            <Icon type={IconTypes.PLAY} />
          </div>
        </div>
        <div
          className="single-item-bg"
          style={{ backgroundColor: singleInfo.color }}
        />
      </div>
    );
  }
}

export { SingleItem };
