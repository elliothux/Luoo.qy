import * as React from "react";
import { observer } from "mobx-react";
import {
  collectionTrackStore,
  playerStore,
  searchTrackStore
} from "../../store";
import { PlayingTypes } from "../../types";
import { TrackItem } from "../track-item";
import { Loading } from "../loading";
import { Empty } from "../empty";
import {Pagination} from "../pagination";

import "./index.scss";
import {scrollToTop} from "../../utils";

let containerRef: HTMLDivElement;

function getContainerRef(i: HTMLDivElement) {
  containerRef = i;
}

function ISearchResultTrack() {
  const { displayedItems, isLoading, pagination } = searchTrackStore;
  const id = "track-search-result-content";

  if (isLoading) {
    return <Loading id={id} />;
  }
  if (displayedItems.length === 0) {
    return <Empty id={id} />;
  }

  return (
    <div id={id} ref={getContainerRef}>
      {displayedItems.map(track => {
        const { id } = track;
        const isPlaying = playerStore.isTrackPlaying(id);

        const onPlay = async () => {
          const ids = searchTrackStore.getIds();
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
            isLiked={collectionTrackStore.isLiked(id)}
            onPlay={onPlay}
            onClick={onClick}
          />
        );
      })}
      <Pagination store={pagination} />
    </div>
  );
}

searchTrackStore.pagination.onChangePage(() => {
  scrollToTop(containerRef);
});

const SearchResultTrack = observer(ISearchResultTrack);

export { SearchResultTrack };
