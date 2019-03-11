import * as React from "react";
import { observer } from "mobx-react";
import {playerStore, store, userCollectionVolTracksStore, userStore} from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import {ViewTypes, VolTrack} from "../../@types";
import {VolTrackItem} from "../vol-track-item";
import {Pagination} from "../pagination";
import "./index.scss";


function renderVolTracks(tracks: ReadonlyArray<VolTrack>) {
  return tracks.map((t) => (
      <VolTrackItem
          key={t.id}
          trackInfo={t}
          isLiked={false}
          isPlaying={false}
          onPlay={() => {}}
          onPause={playerStore.pause}
          onClick={() => {
            store.changeView(ViewTypes.PLAYING);
            // return playerStore.playVolTrack(vol.id, index);
          }}
      />
  ));
}


function IUserCollectionVolTracks() {
  const { isFetching } = userStore;
  const { displayLikedTracks } = userCollectionVolTracksStore;

  if (isFetching) {
    return <Loading />;
  }

  if (displayLikedTracks.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-vol-tracks">
      {renderVolTracks(displayLikedTracks)}
      <Pagination
          pages={userCollectionVolTracksStore.displayTrackPaginations}
          currentPage={userCollectionVolTracksStore.trackCurrentPage}
          togglePage={userCollectionVolTracksStore.toggleTrackIndex}
          paginationCurrentIndex={userCollectionVolTracksStore.trackPaginationCurrentIndex}
          paginationTotalIndex={userCollectionVolTracksStore.trackPaginationTotalIndex}
          onNext={userCollectionVolTracksStore.nextTrackPagination}
          onPre={userCollectionVolTracksStore.preTrackPagination}
      />
    </div>
  );
}

const UserCollectionVolTracks = observer(IUserCollectionVolTracks);

export { UserCollectionVolTracks };
