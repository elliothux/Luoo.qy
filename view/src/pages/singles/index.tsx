import * as React from "react";
import { observer } from "mobx-react";
import {singleStore, store, playerStore, collectionTrackStore} from "../../store";
import { Pagination } from "../../components/pagination";
import { SingleItem } from "../../components/single-item";
import {ViewTypes, Single, PlayingTypes} from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import {ipcUtils, scrollToTop} from "../../utils";
import "./index.scss";

let containerRef: HTMLDivElement;

function getContainerRef(i: HTMLDivElement) {
  containerRef = i;
}

function renderSingles(singles: Maybe<Single[]>) {
  if (!singles) {
    return <Loading />;
  }
  return singles.map((single: Single) => {
    const { id } = single;
    const isPlaying = playerStore.isTrackPlaying(single.id);

    const onPlay = async () => {
      const ids = await ipcUtils.getSingleIds();
      playerStore.setPlayingIds(ids, id, PlayingTypes.SINGLE);
    };

    return (
        <SingleItem
            key={single.id}
            name={single.name}
            artist={single.artist}
            cover={single.cover}
            color={single.color}
            isPlaying={isPlaying}
            isLiked={collectionTrackStore.isLiked(single.id)}
            onClick={() => singleStore.setItem(single.id)}
            onPlay={onPlay}
        />
    )
  });
}

function ISingles() {
  const { displayedItems, pagination } = singleStore;
  return (
    <Route
      currentView={store.view}
      view={ViewTypes.SINGLES}
      id="singles"
      getRef={getContainerRef}
    >
      {renderSingles(displayedItems)}
      <Pagination store={pagination} />
    </Route>
  );
}

singleStore.pagination.onChangePage(() => {
  scrollToTop(containerRef);
});

const Singles = observer(ISingles);

export { Singles };
