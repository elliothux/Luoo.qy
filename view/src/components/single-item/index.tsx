import * as React from "react";
import {Icon, IconTypes} from "../icon";
import "./index.scss";

export interface Props {
  name: Title;
  artist: Artist;
  cover: Cover;
  color: Color;
  isPlaying: boolean;
  isLiked: boolean;
  onToggle: () => void;
  onClick: () => void;
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
      onToggle
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
            <Icon type={isLiked ? IconTypes.LIKE : IconTypes.LIKE} />
            <Icon
                preventDefault
                type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
                onClick={onToggle}
            />
          </div>
        </div>
        <div
          className="single-item-bg"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }
}

export { SingleItem };
