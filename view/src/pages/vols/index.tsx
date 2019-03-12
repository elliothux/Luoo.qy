import * as React from "react";
import { RefObject } from "react";
import { observer } from "mobx-react";
import { volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { events, EventTypes } from "../../utils";
import { ViewTypes, VolInfo } from "../../@types";
import "./index.scss";
import { Loading } from "../../components/loading";

@observer
class Vols extends React.Component {
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  state = {
    isFetching: true
  };

  componentDidMount(): void {
    events.on(EventTypes.ScrollBackVols, (smooth: boolean = false) => {
      const { current } = this.containerRef;
      if (!current) {
        return;
      }
      if (smooth) {
        current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        current.scrollTo(0, 0);
      }
    });
  }

  renderVols(ids: number[]) {
    return vols.map((vol: VolInfo, index: number) => (
      <VolItem
        key={vol.id}
        volInfo={vol}
        index={index}
        isPlaying={false}
        isLiked={false}
      />
    ));
  }

  render() {
    const { displayIds } = volStore;

    return (
      <div
        id="vols"
        className={`page show view-${ViewTypes.VOLS}`}
        style={{ zIndex: 1 }}
        ref={this.containerRef}
      >
        {displayIds ? this.renderVols(displayIds) : <Loading />}
        <Pagination
          pages={volStore.displayPaginations}
          currentPage={volStore.currentPage}
          togglePage={volStore.changeCurrentPage}
          paginationCurrentIndex={volStore.paginationCurrentIndex}
          paginationTotalIndex={volStore.paginationTotalIndex}
          onNext={volStore.nextPagination}
          onPre={volStore.prePagination}
        />
      </div>
    );
  }
}

export { Vols };
