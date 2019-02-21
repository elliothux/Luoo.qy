import * as React from "react";
import {VolInfo} from "../../types";
import "./index.scss";
import {Icon, IconTypes} from "../icon";
import {playerStore, volStore} from "../../store";
import {events, EventTypes} from "../../utils";

export interface Props {
  volInfo: VolInfo;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
}

class VolItem extends React.Component<Props> {
  private coverRef: HTMLImageElement | null = null;

  private getCoverRef = (i: HTMLImageElement | null) => {
    if (i) {
      this.coverRef = i;
    }
  };

  private onClick = () => {
    events.emit(
      EventTypes.ShowVolBackground,
      this.props.volInfo.cover,
      this.coverRef,
      () => {
          events.emit(EventTypes.ScrollBackVol);
          volStore.selectVol(this.props.index);
      }
    );
  };

  public render() {
    const { volInfo, isPlaying } = this.props;
    return (
      <div className="vol-item" onClick={this.onClick}>
        <div
          ref={this.getCoverRef}
          className="vol-item-cover"
          style={{
            backgroundImage: `url(${volInfo.cover})`
          }}
        />
        <div className="vol-item-info">
          <p className="vol-item-info-index">
            vol.
            {volInfo.vol}
          </p>
          <p className="vol-item-info-title">{volInfo.title}</p>
          <div className="vol-item-operation">
            <Icon type={IconTypes.LIKE} />
            {isPlaying ? (
              <Icon
                type={IconTypes.PAUSE}
                onClick={playerStore.pause}
                preventDefault
              />
            ) : (
              <Icon
                type={IconTypes.PLAY}
                onClick={() => playerStore.playVolTrack(volInfo.id)}
                preventDefault
              />
            )}
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
    );
  }
}

export { VolItem };
