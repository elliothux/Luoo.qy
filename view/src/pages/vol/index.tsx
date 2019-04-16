import * as React from "react";
import {RefObject} from "react";
import {observer} from "mobx-react";
import {collectionTrackStore, collectionVolStore, playerStore, store, volStore} from "../../store";
import {Icon, IconTypes} from "../../components/icon";
import {TrackItem} from "../../components/track-item";
import {Route} from "../../components/route";
import {Loading} from "../../components/loading";
import {events, EventTypes, scrollToTop} from "../../utils";
import {PlayingTypes, ViewTypes, VolTrack} from "../../types";
import "./index.scss";

@observer
class Vol extends React.Component {
  private infoRef: RefObject<HTMLDivElement> = React.createRef();
  private tracksRef: RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount(): void {
    store.onChangeView(view => {
      const {
        infoRef: { current: infoRef },
        tracksRef: { current: tracksRef }
      } = this;
      if (infoRef && tracksRef && view === ViewTypes.VOL_INFO) {
        scrollToTop(infoRef, false);
        scrollToTop(tracksRef, false);
      }
    });
  }

  private static get id(): ID {
    const { displayedItem: vol } = volStore;
    return vol ? vol.id : 0;
  }

  private static get trackIds(): ID[] {
    const { displayedItem: vol } = volStore;
    if (!vol || !vol.tracks) {
      return [];
    }
    return vol.tracks.map(i => i.id);
  }

  private static get isPlaying(): boolean {
    const { id } = Vol;
    return id ? playerStore.isVolPlaying(id) : false;
  }

  private static get isLiked(): boolean {
    const { id } = Vol;
    return id ? collectionVolStore.isLiked(id) : false;
  }

  private static get isFetchingLike(): boolean {
    const { id } = Vol;
    return id ? collectionVolStore.isFetchingLike(id) : false;
  }

  private static onTogglePlay = () => {
    if (Vol.isPlaying) {
      return playerStore.pause();
    }

    const { displayedItem: vol } = volStore;
    if (!vol) {
      return;
    }
    const tracks = vol.tracks as VolTrack[];
    playerStore.setPlayingIds(Vol.trackIds, null, PlayingTypes.VOL, vol.id);
  };

  private static onToggleLike = () => {
    if (Vol.isFetchingLike) {
      return;
    }
    return collectionVolStore.toggleLike(Vol.id, Vol.isLiked);
  };

  private static onPlayTrack = async (track: VolTrack) => {
    const { id } = track;
    await playerStore.setPlayingIds(Vol.trackIds, id, PlayingTypes.VOL, Vol.id);
    return playerStore.play();
  };

  private static onClickTrack = async (track: VolTrack) => {
    playerStore.toggleShowPlayer(true);
    if (!Vol.isPlaying) {
      return Vol.onPlayTrack(track);
    }
  };

  private static onSelectTag = (tag: string) => {
    store.changeView(ViewTypes.SEARCH);
    setTimeout(() => {
      events.emit(EventTypes.SEARCH, tag);
    }, 800);
  };

  private static renderTracks = (tracks: VolTrack[]) => {
    return tracks.map(track => {
      const { id, name, artist, album, cover } = track;
      const isPlaying = playerStore.isTrackPlaying(id);

      return (
        <TrackItem
          key={id}
          name={name}
          artist={artist}
          album={album}
          cover={cover}
          isPlaying={isPlaying}
          isLiked={collectionTrackStore.isLiked(id)}
          onPlay={() => Vol.onPlayTrack(track)}
          onClick={() => Vol.onClickTrack(track)}
        />
      );
    });
  };

  private static renderLoading = () => (
    <Route currentView={store.view} view={ViewTypes.VOL_INFO} id="vol">
      <Loading />
    </Route>
  );

  public render() {
    const { displayedItem: vol } = volStore;

    if (!vol) {
      return Vol.renderLoading();
    }

    return (
      <Route currentView={store.view} view={ViewTypes.VOL_INFO} id="vol">
        <div id="vol-bg" style={{ backgroundImage: `url(${vol.cover})` }} />

        <div id="vol-bg-mask" />

        <div id="vol-info" ref={this.infoRef}>
          <div id="vol-info-tags">
            {vol.tags.map(t => (
              <span key={t} onClick={() => Vol.onSelectTag(t)}>#{t}</span>
            ))}
          </div>
          <p id="vol-info-index">
            vol.
            {vol.vol}
            <Icon type={IconTypes.DOWNLOAD}/>
            <Icon
              type={
                Vol.isFetchingLike
                  ? IconTypes.LOADING
                  : Vol.isLiked
                    ? IconTypes.LIKED
                    : IconTypes.LIKE
              }
              onClick={Vol.onToggleLike}
              animate
              preventDefault
            />
            <Icon
              type={Vol.isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={Vol.onTogglePlay}
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

        <div id="vol-tracks" ref={this.tracksRef}>
          {vol.tracks ? Vol.renderTracks(vol.tracks) : null}
        </div>
      </Route>
    );
  }
}

export { Vol };
