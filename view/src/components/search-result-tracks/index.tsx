import * as React from "react";
import { observer } from "mobx-react";
import {collectionTrackStore, playerStore, searchTrackStore} from "../../store";
import {getIPC } from "../../utils";
import { PlayingTypes } from "../../types";
import {TrackItem} from "../track-item";


const ipc = getIPC();

function ISearchResultTrack() {
  const { displayedItems } = searchTrackStore;
  return (
    <div id="track-search-result-content">
      {displayedItems.map(track => {
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
                isLiked={collectionTrackStore.isLiked(id)}
                onPlay={onPlay}
                onClick={onClick}
            />
        );
      })}
    </div>
  );
}

const SearchResultTrack = observer(ISearchResultTrack);

export { SearchResultTrack };
