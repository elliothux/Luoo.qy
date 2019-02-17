import * as React from "react";
import { playerStore } from "../../store";
import { ViewTypes } from "../../types";
import "./index.scss";
import { Icon, IconTypes } from "../../components/icon";

function Player() {
  const {
    formatedTotalTime,
    formatedPlayedTime,
    playingProgress,
    playingInfo: { cover, name, artist, album }
  } = playerStore;
  return (
    <div id="player" className={`page view-${ViewTypes.PLAYING}`}>
      <div id="player-left-block">
        <div id="player-cover" style={{ backgroundImage: `url(${cover})` }} />
        <div>
          <div id="player-control">
            <Icon type={IconTypes.PRE2} />
            <Icon type={IconTypes.PLAY} />
            <Icon type={IconTypes.NEXT2} />
          </div>

          <div id="player-operation">
              <div>
                  <Icon type={IconTypes.LIKE2} />
                  <p>喜欢</p>
              </div>
              <div className="player-mode">
                  <Icon type={IconTypes.SHUFFLE} />
                  <p>随机</p>
              </div>
              <div>
                  <Icon type={IconTypes.CLOUD} />
                  <p>离线</p>
              </div>
          </div>
        </div>

        <div id="player-time">
          <p>{formatedPlayedTime}</p>
          <div id="player-time-control">
            <input min="0" max="100" step="1" type="range" />
            <div
              id="player-time-progress"
              style={{ width: `${playingProgress}%` }}
            />
          </div>
          <p>{formatedTotalTime}</p>
        </div>
      </div>

      <div id="player-right-block">
        <div id="player-info">
          <p id="player-info-name">{name}</p>
          <p id="player-info-album">{album}</p>
          <p id="player-info-artist">{artist}</p>
        </div>
        <div id="player-lyric">歌词加载中</div>
      </div>
    </div>
  );
}

export { Player };
