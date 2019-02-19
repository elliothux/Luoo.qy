import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, singleStore } from "../../store";
import { Pagination } from "../../components/pagination";
import { Single, ViewTypes } from "../../types";
import "./index.scss";
import { SingleItem } from "../../components/single-item";

@observer
class Singles extends React.Component {
  static renderEmpty = () => {
    return <h1>EMPTY</h1>;
  };

  static renderSingles = (singles: Single[]) => {
    return singles.map((single: Single, index: number) => (
      <SingleItem
        key={single.date}
        singleInfo={single}
        index={index}
        isPlaying={playerStore.isSinglePlaying(single.id)}
        isLiked={false}
      />
    ));
  };

  render() {
    const { displaySingles } = singleStore;
    if (!displaySingles.length) {
      return Singles.renderEmpty();
    }
    return (
      <div id="singles" className={`page view-${ViewTypes.SINGLES}`}>
        {Singles.renderSingles(displaySingles)}
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
}

export { Singles };
