import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { playerStore, store } from "../../store";
import { Icon } from "../../components/icon";
import { SoundWave } from "../../components/sound-wave";
import "./index.scss";

function IPlayer() {
  const {
    formatedTotalTime,
    formatedPlayedTime,
    playingProgress,
    playingStatus,
    playingInfo: { cover, name, artist, album },
    playingLyrics
  } = playerStore;

  const isPlayingView = store.view === ViewTypes.PLAYING;
  const isPlaying = playingStatus === PlayingStatus.PLAYING;

  return (
    <div
      id="player"
      className={
        `view-${ViewTypes.PLAYING} ` +
        classnames({
          show: store.view === ViewTypes.PLAYING
        })
      }
    >
      <div id="player-left-block">
        <div
          id="player-cover"
          style={{ backgroundImage: `url(${cover})` }}
          className={classnames({ active: isPlaying })}
        />
        <div>
          <div id="player-control">
            <Icon type={IconTypes.PRE2} onClick={playerStore.pre} />
            {playerStore.playingStatus === PlayingStatus.PLAYING ? (
              <Icon type={IconTypes.PAUSE} onClick={playerStore.pause} />
            ) : (
              <Icon type={IconTypes.PLAY} onClick={playerStore.play} />
            )}
            <Icon type={IconTypes.NEXT2} onClick={playerStore.next} />
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
      </div>

      <div id="player-right-block">
        <div id="player-info">
          <p id="player-info-name">{name}</p>
          <p id="player-info-album">{album}</p>
          <p id="player-info-artist">{artist}</p>
        </div>
        {playingLyrics ? (
          <div
            id="player-lyric"
            className={classnames({
              "with-lyric": true,
              hide: !isPlayingView
            })}
          >
            <p>{playingLyrics[0]}</p>
            <p>{playingLyrics[1]}</p>
            <p>{playingLyrics[2]}</p>
            <p>{playingLyrics[3]}</p>
            <p>{playingLyrics[4]}</p>
            <p>{playingLyrics[5]}</p>
            <p>{playingLyrics[6]}</p>
            <p>{playingLyrics[7]}</p>
            <p>{playingLyrics[8]}</p>
          </div>
        ) : (
          "暂无歌词"
        )}
      </div>

      <div id="player-bg">
        <SoundWave isActive={isPlaying} show={isPlayingView} />
        <div
          id="player-bg-image"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
      </div>

      <div id="player-time">
        <p>{formatedPlayedTime}</p>
        <div id="player-time-control">
          <input
            min="0"
            max="100"
            step="1"
            type="range"
            onChange={e => {
              playerStore.changePlayingRatio(+e.target.value);
            }}
          />
          <div
            id="player-time-progress"
            style={{ width: `${playingProgress}%` }}
          />
        </div>
        <p>{formatedTotalTime}</p>
      </div>
    </div>
  );
}

const Player = observer(IPlayer);

export { Player };
