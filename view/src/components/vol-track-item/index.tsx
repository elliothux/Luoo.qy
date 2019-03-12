import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { VolTrack } from "../../types";
import "./index.scss";

export interface Props {
  trackInfo: VolTrack;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onPause: () => void;
  onClick: () => void;
}

function VolTrackItem(props: Props) {
  const { trackInfo: track, isPlaying, onPlay, onPause, onClick } = props;
  return (
    <div className="vol-track-item" onClick={onClick}>
      <div
        className="vol-track-item-cover"
        style={{
          backgroundImage: `url(${track.cover})`
        }}
      />
      <p className="vol-track-item-name">{track.name}</p>
      <p className="vol-track-item-album">{track.album}</p>
      <p className="vol-track-item-artist">{track.artist}</p>
      <div className="vol-track-item-operation">
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

export { VolTrackItem };
