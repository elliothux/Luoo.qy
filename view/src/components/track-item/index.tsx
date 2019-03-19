import * as React from "react";
import { Icon, IconTypes } from "../icon";
import "./index.scss";
import { playerStore } from "../../store";

export interface Props {
  name: Title;
  artist: Artist;
  album: Album;
  cover: Cover;
  isPlaying: boolean;
  isLiked: boolean;
  onClick: () => void;
  onPlay: () => void;
  onPause?: () => void;
}

function TrackItem(props: Props) {
  const {
    name,
    artist,
    album,
    cover,
    isPlaying,
    isLiked,
    onClick,
    onPlay,
    onPause = playerStore.pause
  } = props;
  return (
    <div className="vol-track-item" onClick={onClick}>
      <div
        className="vol-track-item-cover"
        style={{
          backgroundImage: `url(${cover})`
        }}
      />
      <p className="vol-track-item-name">{name}</p>
      <p className="vol-track-item-album">{album}</p>
      <p className="vol-track-item-artist">{artist}</p>
      <div className="vol-track-item-operation">
        <Icon
          className="play"
          type={isPlaying ? IconTypes.PAUSE_SOLID : IconTypes.PLAY_SOLID}
          onClick={isPlaying ? onPause : onPlay}
          preventDefault
        />
        <Icon
          className="like"
          type={isLiked ? IconTypes.LIKED : IconTypes.LIKE}
          preventDefault
        />
      </div>
    </div>
  );
}

export { TrackItem };
