import * as React from "react";
import { Single } from "../../types";
import { Icon, IconTypes } from "../icon";
import { playerStore, singleStore } from "../../store";
import { events, EventTypes, isAnyPartOfElementInViewport } from "../../utils";
import "./index.scss";

export interface Props {
  singleInfo: Single;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
}

class SingleItem extends React.Component<Props> {
  componentDidMount(): void {
    events.on(EventTypes.SelectSingle, this.onEmitSelectSingle);
  }
  componentWillUnmount(): void {
    events.cancel(EventTypes.SelectSingle, this.onEmitSelectSingle);
  }

  private coverRef: HTMLImageElement | null = null;

  private getCoverRef = (i: HTMLImageElement | null) => {
    if (i) {
      this.coverRef = i;
    }
  };

  private onEmitSelectSingle = (index: number) => {
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
      EventTypes.ShowSingleBackground,
      this.props.singleInfo.cover,
      this.coverRef,
      () => singleStore.selectSingle(this.props.index)
    );
  };

  public render() {
    const { singleInfo, isPlaying, isLiked } = this.props;
    return (
      <div key={singleInfo.id} className="single-item" onClick={this.onClick}>
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
            {isPlaying ? (
              <Icon
                preventDefault
                type={IconTypes.PAUSE}
                onClick={playerStore.pause}
              />
            ) : (
              <Icon
                preventDefault
                type={IconTypes.PLAY}
                onClick={() => playerStore.playSingle(singleInfo.id)}
              />
            )}
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
