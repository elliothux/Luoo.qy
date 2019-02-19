import * as React from "react";
import {observer} from "mobx-react";
import {playerStore, store} from "../../store";
import {Icon, IconTypes} from "../icon";
import "./index.scss";
import {PlayingStatus, ViewTypes} from "../../types";

function IMiniPlayer() {
  const { view } = store;
  const { playingInfo: info, playingProgress } = playerStore;

  const show = [
    ViewTypes.VOL_INFO,
    ViewTypes.SINGLE_INFO,
    ViewTypes.ARTICLE_INFO,
    ViewTypes.PLAYING
  ].includes(view);

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
          onClick={() => store.changeView(ViewTypes.PLAYING)}
        />
        <div id="mini-player-info">
          <div id="mini-player-info-text">
            <p id="mini-player-info-name">{info.name}</p>
            <p id="mini-player-info-album">
              {info.album} / {info.artist}
            </p>
          </div>
          <div id="mini-player-controller">
            <Icon type={IconTypes.PRE} onClick={playerStore.pre.bind(playerStore)} />
            {
              playerStore.playingStatus === PlayingStatus.PLAYING ?
                  <Icon className="play" type={IconTypes.PAUSE} onClick={playerStore.pause.bind(playerStore)}/> :
                  <Icon className="play" type={IconTypes.PLAY} onClick={playerStore.play.bind(playerStore)} />
            }
            <Icon type={IconTypes.NEXT} onClick={playerStore.next.bind(playerStore)} />
            <Icon className="play-mode" type={IconTypes.RANDOM} />
          </div>
          <div id="mini-player-progress">
            <div style={{ width: `${playingProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="mini-player-collapsed">
      <Icon type={IconTypes.WAVE} />
    </div>
  );
}

const MiniPlayer = observer(IMiniPlayer);

export { MiniPlayer };
