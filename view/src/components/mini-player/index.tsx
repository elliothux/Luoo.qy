import * as React from "react";
import {observer} from "mobx-react";
import {store} from "../../store";
import {Icon, IconTypes} from "../icon";
import "./index.scss";
import {ViewTypes} from "../../types";

function IMiniPlayer() {
  const { view, playingInfo: info, playingProgress } = store;
  if (view === ViewTypes.VOLS) {
      return (
          <div id="mini-player-collapsed">
              <Icon type={IconTypes.WAVE} />
          </div>
      );
  }
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
      />
      <div id="mini-player-info">
        <div id="mini-player-info-text">
          <p id="mini-player-info-name">{info.name}</p>
          <p id="mini-player-info-album">
            {info.album} / {info.artist}
          </p>
        </div>
        <div id="mini-player-controller">
          <Icon type={IconTypes.PRE} />
          <Icon className="play" type={IconTypes.PLAY} />
          <Icon type={IconTypes.NEXT} />
          <Icon className="play-mode" type={IconTypes.RANDOM} />
        </div>
        <div id="mini-player-progress">
          <div style={{ width: `${playingProgress}%` }} />
        </div>
      </div>
    </div>
  );
}

const MiniPlayer = observer(IMiniPlayer);

export { MiniPlayer };
