import * as React from "react";
import { observer } from "mobx-react";
import { store, volStore } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { TrackItem } from "../../components/track-item";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import { ViewTypes, VolInfo } from "../../types";
import "./index.scss";

function renderTracks(vol: Maybe<VolInfo>) {
  if (!vol || !vol.tracks) {
    return <Loading />;
  }
  return vol.tracks.map(track => {
    return (
      <TrackItem
        key={track.id}
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
      <Route currentView={store.view} view={ViewTypes.VOL_INFO} id="vol">
        <Loading />
      </Route>
    );
  }

  return (
    <Route currentView={store.view} view={ViewTypes.VOL_INFO} id="vol">
      <div
        id="vol-bg"
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

      <div id="vol-tracks">{renderTracks(vol)}</div>
    </Route>
  );
}

const Vol = observer(IVol);

export { Vol };
