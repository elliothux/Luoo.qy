import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { collectionVolStore, playerStore, volStore } from "../../store";
import { observer } from "mobx-react";
import "./index.scss";

export interface Props {
  id: ID;
  cover: Cover;
  title: Title;
  tags: Tag[];
  color: Color;
  vol: number;
  isPlaying: boolean;
  isLiked?: boolean;
  onPlay: () => void;
  onPause?: () => void;
}

@observer
class VolItem extends React.Component<Props> {
  private onClick = () => {
    const { id } = this.props;
    volStore.setItem(id);
  };

  private get isLiked(): boolean {
    const { id, isLiked } = this.props;
    if (typeof isLiked === "boolean") {
      return isLiked;
    }
    return collectionVolStore.isLiked(id);
  }

  private get isFetchingLike(): boolean {
    const { id } = this.props;
    return collectionVolStore.isFetchingLike(id);
  }

  private onToggleLike = () => {
    if (this.isFetchingLike) {
      return;
    }
    const { id } = this.props;
    return collectionVolStore.toggleLike(id, this.isLiked);
  };

  public render() {
    const {
      cover,
      title,
      vol,
      tags,
      color,
      isPlaying,
      onPlay,
      onPause = playerStore.pause
    } = this.props;

    return (
      <div className="vol-item" onClick={this.onClick}>
        <div
          className="vol-item-cover"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
        <div className="vol-item-info">
          <p className="vol-item-info-index">
            vol.
            {vol}
          </p>
          <p className="vol-item-info-title">{title}</p>
          <div className="vol-item-operation">
            <Icon
              type={
                this.isFetchingLike
                  ? IconTypes.LOADING
                  : this.isLiked
                    ? IconTypes.LIKED
                    : IconTypes.LIKE
              }
              onClick={this.onToggleLike}
              animate
              preventDefault
            />
            <Icon
              type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={isPlaying ? onPause : onPlay}
              preventDefault
            />
          </div>
        </div>
        <div className="vol-item-tags">
          {tags.map(t => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <div className="vol-item-bg" style={{ backgroundColor: color }} />
      </div>
    );
  }
}

export { VolItem };
