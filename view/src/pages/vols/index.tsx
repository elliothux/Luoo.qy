import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { ViewTypes, VolInfo } from "../../types";
import "./index.scss";


function renderVols(vols: VolInfo[]) {
  return vols.map((vol: VolInfo, index: number) => (
      <VolItem
          key={vol.id}
          volInfo={vol}
          index={index}
          isPlaying={playerStore.isVolPlaying(vol.id)}
          isLiked={false}
      />
  ));
}

function IVols() {
  const { displayVols } = volStore;

  return (
      <div
          id="vols"
          className={`page show view-${ViewTypes.VOLS}`}
          style={{ zIndex: 1 }}
      >
        {renderVols(displayVols)}
        <Pagination
            pages={volStore.displayVolPaginations}
            currentPage={volStore.volCurrentPage}
            togglePage={volStore.toggleVolIndex}
            paginationCurrentIndex={volStore.volPaginationCurrentIndex}
            paginationTotalIndex={volStore.volPaginationTotalIndex}
            onNext={volStore.nextVolPagination}
            onPre={volStore.preVolPagination}
        />
      </div>
  );
}

const Vols = observer(IVols);

export { Vols };
