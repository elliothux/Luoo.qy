import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import {collectionTrackStore, playerStore, store} from "../../store";
import { Icon, IconTypes } from "../icon";
import { SoundWave } from "../sound-wave";
import { Loading } from "../loading";
import { PlayingStatus } from "../../types";
import "./index.scss";

function IPlayer() {
  const {
    formatedTotalTime,
    formatedPlayedTime,
    playingProgress,
    playingStatus,
    playingTrack,
    playingLyrics,
      showPlayer
  } = playerStore;

  if (!playingTrack) {
    return (
        <div
            id="player"
            className={showPlayer ? 'show' : ''}
        >
          <Loading />
        </div>
    );
  }

  const { cover, name, artist, album, id } = playingTrack;
  const isPlaying = playingStatus === PlayingStatus.PLAYING;
  const isLiked = collectionTrackStore.isLiked(id);

  return (
    <div
      id="player"
      className={showPlayer ? 'show' : ''}
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
              <Icon type={isLiked ? IconTypes.LIKED2 : IconTypes.LIKE2} />
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
              hide: !showPlayer
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
        <SoundWave isActive={isPlaying} show={showPlayer} />
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
