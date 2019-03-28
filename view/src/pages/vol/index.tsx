import * as React from "react";
import { observer } from "mobx-react";
import {
  collectionTrackStore,
  collectionVolStore,
  playerStore,
  store,
  volStore
} from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { TrackItem } from "../../components/track-item";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import { PlayingTypes, ViewTypes, VolInfo, VolTrack } from "../../types";
import "./index.scss";
import { noop, scrollToTop } from "../../utils";
import { func } from "prop-types";

let infoRef: Maybe<HTMLDivElement> = null;
let tracksRef: Maybe<HTMLDivElement> = null;

function renderTracks(vol: VolInfo) {
  const tracks = vol.tracks as VolTrack[];
  const ids = tracks.map(i => i.id);

  return tracks.map(track => {
    const { id, name, artist, album, cover } = track;
    const isPlaying = playerStore.isTrackPlaying(id);

    const onPlay = async () => {
      await playerStore.setPlayingIds(ids, id, PlayingTypes.VOL, vol.id);
      return playerStore.play();
    };

    const onClick = () => {
      playerStore.toggleShowPlayer(true);
      if (!isPlaying) {
        return onPlay();
      }
    };

    return (
      <TrackItem
        key={id}
        name={name}
        artist={artist}
        album={album}
        cover={cover}
        isPlaying={isPlaying}
        isLiked={collectionTrackStore.isLiked(id)}
        onPlay={onPlay}
        onClick={onClick}
      />
    );
  });
}

function play(vol: VolInfo) {
  const tracks = vol.tracks as VolTrack[];
  const ids = tracks.map(i => i.id);
  playerStore.setPlayingIds(ids, null, PlayingTypes.VOL, vol.id);
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

  const { id } = vol;
  const isPlaying = playerStore.isVolPlaying(id);
  const isLiked = collectionVolStore.isLiked(id);
  const isFetchingLike = collectionVolStore.isFetchingLike(id);

  return (
    <Route currentView={store.view} view={ViewTypes.VOL_INFO} id="vol">
      <div id="vol-bg" style={{ backgroundImage: `url(${vol.cover})` }} />

      <div id="vol-bg-mask" />

      <div id="vol-info" ref={i => (infoRef = i)}>
        <div id="vol-info-tags">
          {vol.tags.map(t => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <p id="vol-info-index">
          vol.
          {vol.vol}
          <Icon
            type={
              isFetchingLike
                ? IconTypes.LOADING
                : isLiked
                  ? IconTypes.LIKED
                  : IconTypes.LIKE
            }
            onClick={
              isFetchingLike
                ? noop
                : () => collectionVolStore.toggleLike(id, isLiked)
            }
            animate
            preventDefault
          />
          <Icon
            type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
            onClick={isPlaying ? playerStore.pause : () => play(vol)}
          />
        </p>
        <p id="vol-info-title">{vol.title}</p>
        <div
          id="vol-info-desc"
          dangerouslySetInnerHTML={{ __html: vol.desc }}
        />
        <div id="vol-info-date">
          <Icon type={IconTypes.LOGO} />
          <span id="vol-info-author">{vol.author} · </span>
          <span id="vol-info-date">{vol.date}</span>
        </div>
      </div>

      <div id="vol-tracks" ref={i => (tracksRef = i)}>
        {renderTracks(vol)}
      </div>
    </Route>
  );
}

store.onChangeView(view => {
  if (infoRef && tracksRef && view === ViewTypes.VOL_INFO) {
    scrollToTop(infoRef, false);
    scrollToTop(tracksRef, false);
  }
});

const Vol = observer(IVol);

export { Vol };
