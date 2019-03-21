import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, store } from "../../store";
import { Icon, IconTypes } from "../icon";
import { ViewTypes, PlayingStatus } from "../../types";
import { noop } from "../../utils";
import "./index.scss";

function IMiniPlayer() {
  const { view } = store;
  const { playingTrack, playingProgress } = playerStore;
  const info = playingTrack || {
    name: "",
    cover: "",
    album: "",
    artist: ""
  };

  const show =
    [
      ViewTypes.VOL_INFO,
      ViewTypes.SINGLE_INFO,
      ViewTypes.ARTICLE_INFO
    ].includes(view) || playerStore.showPlayer;

  if (show) {
    return (
      <div id="mini-player">
        <div id="mini-player-operation">
          <Icon type={IconTypes.WAVE} />
          <Icon type={IconTypes.CLOUD} />
          <Icon type={IconTypes.LIKE} />
        </div>
        <div
          id="mini-player-cover"
          style={{ backgroundImage: `url(${info.cover})` }}
          onClick={
            playingTrack ? () => playerStore.toggleShowPlayer(true) : noop
          }
        >
          <Icon type={IconTypes.EXPAND} />
        </div>
        <div id="mini-player-info">
          <div id="mini-player-info-text">
            <p id="mini-player-info-name">{info.name}</p>
            <p id="mini-player-info-album">
              {info.album ? `${info.album} / ` : ""}
              {info.artist}
            </p>
          </div>
          <div id="mini-player-controller">
            <Icon type={IconTypes.PRE} onClick={playerStore.pre} />
            {playerStore.playingStatus === PlayingStatus.PLAYING ? (
              <Icon
                className="play"
                type={IconTypes.PAUSE}
                onClick={playerStore.pause}
              />
            ) : (
              <Icon
                className="play"
                type={IconTypes.PLAY}
                onClick={playerStore.play}
              />
            )}
            <Icon type={IconTypes.NEXT} onClick={playerStore.next} />
            <Icon className="play-mode" type={IconTypes.RANDOM} />
          </div>
          <div id="mini-player-progress">
            <div style={{ width: `${playingProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  if (playingTrack) {
    return (
      <div id="mini-player-collapsed">
        <Icon
          type={IconTypes.WAVE}
          onClick={() => playerStore.toggleShowPlayer(true)}
        />
      </div>
    );
  }

  return null;
}

const MiniPlayer = observer(IMiniPlayer);

export { MiniPlayer };
