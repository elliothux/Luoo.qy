import * as React from "react";
import { Single } from "../../types";
import { Icon, IconTypes } from "../icon";
import { playerStore, singleStore } from "../../store";
import { events, EventTypes } from "../../utils";
import "./index.scss";

export interface Props {
  singleInfo: Single;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
}

let coverRef: HTMLImageElement;

function getCoverRef(i: HTMLImageElement | null) {
  coverRef = i as HTMLImageElement;
}

function onClick(cover: string, index: number) {
  events.emit(EventTypes.ShowSingleBackground, cover, coverRef, () =>
    singleStore.selectSingle(index)
  );
}

function SingleItem(props: Props) {
  const { singleInfo, isPlaying, isLiked, index } = props;
  return (
    <div
      key={singleInfo.id}
      className="single-item"
      onClick={() => onClick(singleInfo.cover, index)}
    >
      <div
        ref={getCoverRef}
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

export { SingleItem };
