import * as React from "react";
import { observer } from "mobx-react";
import {singleStore, store, Pagination as PaginationStore, playerStore, collectionTrackStore} from "../../store";
import { Pagination } from "../../components/pagination";
import { SingleItem } from "../../components/single-item";
import {ViewTypes, Single, VolTrack, PlayingTypes} from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import "./index.scss";
import {getIPC, ipcUtils} from "../../utils";

const ipc = getIPC();
let singlesRef: HTMLDivElement;

function getSinglesRef(i: Maybe<HTMLDivElement>) {
  singlesRef = i as HTMLDivElement;
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
      getRef={getSinglesRef}
    >
      {renderSingles(displayedItems)}
      <Pagination store={pagination} />
    </Route>
  );
}

const Singles = observer(ISingles);

export { Singles };
