import * as React from "react";
import { ArticleTrack } from "../../types";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

export interface Props {
  trackInfo: ArticleTrack;
}

function ArticleTrackItem(props: Props) {
  const { trackInfo: track } = props;
  return (
    <div className="article-track-item">
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
        <Icon className="play" type={IconTypes.PLAY_SOLID} />
        <Icon className="like" type={IconTypes.LIKE} />
      </div>
    </div>
  );
}

export { ArticleTrackItem };
