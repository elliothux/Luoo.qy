import * as React from "react";
import { Icon, IconTypes } from "../icon";
import "./index.scss";
import {playerStore} from "../../store";

export interface Props {
  name: Title;
  artist: Artist;
  cover: Cover;
  color: Color;
  isPlaying: boolean;
  isLiked: boolean;
  onClick: () => void;
  onPlay: () => void;
  onPause?: () => void;
}

class SingleItem extends React.Component<Props> {
  public render() {
    const {
      name,
      artist,
      cover,
      isPlaying,
      isLiked,
      color,
      onClick,
      onPlay,
      onPause = playerStore.pause
    } = this.props;

    return (
      <div className="single-item" onClick={onClick}>
        <div
          className="single-item-cover"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
        <div className="single-item-info">
          <div className="single-item-info-container">
            <p className="single-item-info-name">{name}</p>
            <p className="single-item-info-artist">{artist}</p>
          </div>
          <div className="single-item-operation">
            <Icon type={isLiked ? IconTypes.LIKED : IconTypes.LIKE} />
            <Icon
              preventDefault
              type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={isPlaying ? onPause : onPlay}
            />
          </div>
        </div>
        <div className="single-item-bg" style={{ backgroundColor: color }} />
      </div>
    );
  }
}

export { SingleItem };
