import * as React from "react";
import { Icon, IconTypes } from "../icon";
import {playerStore, volStore, userStore, userCollectionVolsStore} from "../../store";
import { events, EventTypes, isAnyPartOfElementInViewport } from "../../utils";
import { VolInfo } from "../../@types";
import "./index.scss";

export interface Props {
  volInfo: VolInfo;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
  isInUserCollection?: boolean
}

class VolItem extends React.Component<Props> {
  componentDidMount(): void {
    events.on(EventTypes.SelectVol, this.onEmitSelectVol);
  }
  componentWillUnmount(): void {
    events.cancel(EventTypes.SelectVol, this.onEmitSelectVol);
  }

  private coverRef: Maybe<HTMLImageElement> = null;

  private getCoverRef = (i: Maybe<HTMLImageElement>) => {
    if (i) {
      this.coverRef = i;
    }
  };

  private onEmitSelectVol = (index: number) => {
    if (index === this.props.index) {
      const cover = this.coverRef as HTMLImageElement;
      if (isAnyPartOfElementInViewport(cover)) {
        setTimeout(this.onClick, 300);
      } else {
        cover.scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(this.onClick, 600);
      }
    }
  };

  private onClick = () => {
    events.emit(
      EventTypes.ShowVolBackground,
      this.props.volInfo.cover,
      this.coverRef,
      () => {
        events.emit(EventTypes.ScrollBackVol);
        if (this.props.isInUserCollection) {
          userCollectionVolsStore.selectLikedVol(this.props.index);
        } else {
          volStore.selectVol(this.props.index);
        }
      }
    );
  };

  public render() {
    const { volInfo, isPlaying, isInUserCollection } = this.props;
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
