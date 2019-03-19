import * as React from "react";
import {observer} from "mobx-react";
import {collectionTrackStore, playerStore} from "../../store";
import {Loading} from "../loading";
import {Empty} from "../empty";
import {PlayingTypes, Track} from "../../types";
import {Pagination} from "../pagination";
import {TrackItem} from "../track-item";
import "./index.scss";
import {getIPC} from "../../utils";

const ipc = getIPC();

function renderTracks(tracks: Track[]) {
  return tracks.map(track => {
    const { id } = track;
    const isPlaying = playerStore.isTrackPlaying(id);

    const onPlay = async () => {
      const ids = ipc.user.getUserLikedTrackIds();
      playerStore.setPlayingIds(ids, id, PlayingTypes.COLLECTION_TRACK);
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
        name={track.name}
        artist={track.artist}
        album={track.album}
        cover={track.cover}
        isPlaying={isPlaying}
        isLiked={true}
        onPlay={onPlay}
        onClick={onClick}
      />
    );
  });
}

function IUserCollectionTracks() {
  const { isFetching, pagination, displayedItems } = collectionTrackStore;

  if (isFetching) {
    return <Loading />;
  }

  if (displayedItems.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-tracks">
      {renderTracks(displayedItems)}
      <Pagination store={pagination} />
    </div>
  );
}

const UserCollectionTracks = observer(IUserCollectionTracks);

export { UserCollectionTracks };
