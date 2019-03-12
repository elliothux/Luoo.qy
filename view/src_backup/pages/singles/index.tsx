import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, singleStore } from "../../store";
import { Pagination } from "../../components/pagination";
import { SingleItem } from "../../components/single-item";
import { events, EventTypes } from "../../utils";
import { ViewTypes, Single } from "../../@types";
import "./index.scss";

let singlesRef: HTMLDivElement;

function getSinglesRef(i: Maybe<HTMLDivElement>) {
  singlesRef = i as HTMLDivElement;
}

function renderSingles(singles: Single[]) {
  return singles.map((single: Single, index: number) => (
    <SingleItem
      key={single.date}
      singleInfo={single}
      index={index}
      isPlaying={playerStore.isSinglePlaying(single.id)}
      isLiked={false}
    />
  ));
}

function ISingles() {
  const { displaySingles } = singleStore;
  return (
    <div
      id="singles"
      className={`page view-${ViewTypes.SINGLES}`}
      ref={getSinglesRef}
    >
      {renderSingles(displaySingles)}
      <Pagination
        pages={singleStore.displaySinglePaginations}
        currentPage={singleStore.singleCurrentPage}
        togglePage={singleStore.toggleSingleIndex}
        paginationCurrentIndex={singleStore.singlePaginationCurrentIndex}
        paginationTotalIndex={singleStore.singlePaginationTotalIndex}
        onNext={singleStore.nextSinglePagination}
        onPre={singleStore.preSinglePagination}
      />
    </div>
  );
}

const Singles = observer(ISingles);

events.on(EventTypes.ScrollBackSingles, (smooth: boolean = false) => {
  if (smooth) {
    singlesRef.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  } else {
    singlesRef.scrollTo(0, 0);
  }
});

export { Singles };
