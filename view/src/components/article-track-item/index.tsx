import * as React from "react";
import { Icon } from "../icon";
import "./index.scss";

export interface Props {
  trackInfo: ArticleTrack;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onPause: () => void;
  onClick: () => void;
}

function ArticleTrackItem(props: Props) {
  const {
    trackInfo: track,
    isPlaying,
    isLiked,
    onPause,
    onPlay,
    onClick
  } = props;
  return (
    <div className="article-track-item" onClick={onClick}>
      <div
        className="article-track-item-cover"
        style={{
          backgroundImage: `url(${track.cover})`
        }}
      />
      <p className="article-track-item-name">{track.name}</p>
      <p className="article-track-item-album">{track.album}</p>
      <p className="article-track-item-artist">{track.artist}</p>
      <div className="article-track-item-operation">
        {isPlaying ? (
          <Icon
            className="play"
            type={IconTypes.PAUSE_SOLID}
            onClick={onPause}
            preventDefault
          />
        ) : (
          <Icon
            className="play"
            type={IconTypes.PLAY_SOLID}
            onClick={onPlay}
            preventDefault
          />
        )}
        <Icon className="like" type={IconTypes.LIKE} preventDefault />
      </div>
    </div>
  );
}

export { ArticleTrackItem };
