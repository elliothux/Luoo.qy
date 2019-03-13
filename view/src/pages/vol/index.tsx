import * as React from "react";
import anime from "animejs";
import { observer } from "mobx-react";
import { store, volStore } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { TrackItem } from "../../components/track-item";
import { events, EventTypes, px } from "../../utils";
import { ViewTypes, ElementPosition, VolInfo } from "../../types";
import "./index.scss";
import { Loading } from "../../components/loading";

let infoRef: HTMLDivElement;
let tracksRef: HTMLDivElement;
let coverRef: HTMLDivElement;
let coverPos: ElementPosition;

function getCoverRef(i: Maybe<HTMLImageElement>) {
  coverRef = i as HTMLDivElement;
}

function getInfoRef(i: Maybe<HTMLDivElement>) {
  infoRef = i as HTMLDivElement;
}

function getTracksRef(i: Maybe<HTMLDivElement>) {
  tracksRef = i as HTMLDivElement;
}

function renderTracks(vol: VolInfo) {
  const { tracks } = vol;
  if (!tracks) {
    return <Loading />;
  }
  return tracks.map(track => {
    return (
      <TrackItem
        name={track.name}
        artist={track.artist}
        album={track.album}
        cover={track.cover}
        isPlaying={false}
        isLiked={false}
        onToggle={() => {}}
        onClick={() => {}}
      />
    );
  });
}

function IVol() {
  const { displayedItem: vol } = volStore;

  if (!vol) {
    return (
      <div id="vol" className={`page view-${ViewTypes.VOL_INFO}`}>
        <Loading />
      </div>
    );
  }

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

      <div id="vol-info" ref={getInfoRef}>
        <div id="vol-info-tags">
          {vol.tags.map(t => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <p id="vol-info-index">
          vol.
          {vol.vol}
          <Icon type={IconTypes.LIKE} />
          <Icon type={IconTypes.PLAY} />
          {/*{playerStore.isVolPlaying(vol.id) ? (*/}
          {/*<Icon type={IconTypes.PAUSE} />*/}
          {/*) : (*/}
          {/*<Icon*/}
          {/*type={IconTypes.PLAY}*/}
          {/*/>*/}
          {/*)}*/}
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

      <div id="vol-tracks" ref={getTracksRef}>
        {renderTracks(vol)}
      </div>
    </div>
  );
}

const Vol = observer(IVol);

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

events.on(EventTypes.ScrollBackVol, () => {
  infoRef.scrollTo(0, 0);
  tracksRef.scrollTo(0, 0);
});

export { Vol };
