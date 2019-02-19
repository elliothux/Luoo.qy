import * as React from "react";
import anime from "animejs";
import { observer } from "mobx-react";
import { playerStore, volStore } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { VolTrackItem } from "../../components/vol-track-item";
import {
  ElementPosition,
  PlayingStatus,
  PlayingTypes,
  ViewTypes
} from "../../types";
import { events, EventTypes, px } from "../../utils";
import "./index.scss";

let coverRef: HTMLDivElement;
let coverPos: ElementPosition;

function getCoverRef(i: HTMLImageElement | null) {
  coverRef = i as HTMLDivElement;
}

events.on(EventTypes.ShowVolBackground, (src, cover, callback) => {
  const { top, right, bottom, left } = cover.getBoundingClientRect();
  coverPos = { top, right, bottom, left } as ElementPosition;

  coverRef.style.backgroundImage = `url(${src})`;
  coverRef.style.opacity = "1";
  coverRef.style.top = px(top);
  coverRef.style.left = px(left);
  coverRef.style.width = px(right - left);
  coverRef.style.height = px(bottom - top);

  anime({
    targets: coverRef,
    easing: "easeInOutExpo",
    width: "100%",
    height: "100%",
    duration: 600,
    top: 0,
    left: 0,
    begin: callback
  });
});

function IVol() {
  const { selectedVol: vol } = volStore;
  if (!vol) return null;
  const isPlaying =
    playerStore.playingStatus === PlayingStatus.PLAYING &&
    playerStore.playingType === PlayingTypes.VOL &&
    playerStore.playingVolId === vol.id;
  return (
    <div id="vol" className={`page view-${ViewTypes.VOL_INFO}`}>
      <div
        id="vol-bg"
        ref={getCoverRef}
        style={{
          backgroundImage: `url(${vol.cover})`
        }}
      />
      <div id="vol-bg-mask" />
      <div id="vol-info">
        <div id="vol-info-tags">
          {vol.tags.map(t => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <p id="vol-info-index">
          vol.
          {vol.vol}
          <Icon type={IconTypes.LIKE} />
          {isPlaying ? (
            <Icon
              type={IconTypes.PAUSE}
              onClick={playerStore.pause.bind(playerStore)}
            />
          ) : (
            <Icon
              type={IconTypes.PLAY}
              onClick={() => playerStore.playVolTrack(vol.id)}
            />
          )}
        </p>
        <p id="vol-info-title">{vol.title}</p>
        <div
          id="vol-info-desc"
          dangerouslySetInnerHTML={{
            __html: vol.desc
          }}
        />
        <div id="vol-info-date">
          <Icon type={IconTypes.LOGO} />
          <span id="vol-info-author">{vol.author} · </span>
          <span id="vol-info-date">{vol.date}</span>
        </div>
      </div>
      <div id="vol-tracks">
        {vol.tracks.map((t, index) => (
          <VolTrackItem
            key={t.id}
            trackInfo={t}
            isLiked={false}
            isPlaying={isPlaying && playerStore.playingVolTrackIndex === index}
            onPlay={() => playerStore.playVolTrack(vol.id, index)}
            onPause={playerStore.pause.bind(playerStore)}
          />
        ))}
      </div>
    </div>
  );
}

const Vol = observer(IVol);

export { Vol };
