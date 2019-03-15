import * as React from "react";
import { observer } from "mobx-react";
import {collectionTrackStore} from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import {Track} from "../../types";
import {Pagination} from "../pagination";
import {TrackItem} from "../track-item";
import "./index.scss";


function renderTracks(tracks: Track[]) {
    return tracks.map(track => {
        return (
            <TrackItem
                key={`${track.name}-${track.id}`}
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
