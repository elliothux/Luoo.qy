import * as React from "react";
import { VolTrack } from "../../types";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

export interface Props {
  trackInfo: VolTrack;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onPause: () => void;
}

function VolTrackItem(props: Props) {
  const { trackInfo: track, isLiked, isPlaying, onPlay, onPause } = props;
  return (
    <div className="vol-track-item">
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
          />
        ) : (
          <Icon className="play" type={IconTypes.PLAY_SOLID} onClick={onPlay} />
        )}
        <Icon className="like" type={IconTypes.LIKE} />
      </div>
    </div>
  );
}

export { VolTrackItem };
