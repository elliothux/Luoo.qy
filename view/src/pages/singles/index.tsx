import * as React from "react";
import { observer } from "mobx-react";
import { singleStore, store, Pagination as PaginationStore } from "../../store";
import { Pagination } from "../../components/pagination";
import { SingleItem } from "../../components/single-item";
import { ViewTypes, Single } from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import "./index.scss";

let singlesRef: HTMLDivElement;

function getSinglesRef(i: Maybe<HTMLDivElement>) {
  singlesRef = i as HTMLDivElement;
}

function renderSingles(singles: Maybe<Single[]>) {
  if (!singles) {
    return <Loading />;
  }
  return singles.map((single: Single) => (
    <SingleItem
      key={single.id}
      name={single.name}
      artist={single.artist}
      cover={single.cover}
      color={single.color}
      isPlaying={false}
      isLiked={false}
      onToggle={() => {}}
      onClick={() => singleStore.setItem(single.id)}
    />
  ));
}

function renderPagination(pagination: Maybe<PaginationStore>) {
  if (!pagination) return null;
  return <Pagination store={pagination} />;
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
      {renderPagination(pagination)}
    </Route>
  );
}

const Singles = observer(ISingles);

export { Singles };
