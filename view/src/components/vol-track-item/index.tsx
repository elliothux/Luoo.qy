import * as React from "react";
import { VolTrack } from "../../types";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

export interface Props {
  trackInfo: VolTrack;
}

function VolTrackItem(props: Props) {
  const { trackInfo: track } = props;
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
        <Icon className="play" type={IconTypes.PLAY_SOLID} />
        <Icon className="like" type={IconTypes.LIKE} />
      </div>
    </div>
  );
}

export { VolTrackItem };
