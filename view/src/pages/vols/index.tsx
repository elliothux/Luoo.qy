import * as React from "react";
import { observer } from "mobx-react";
import { volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { ViewTypes, VolInfo } from "../../types";
import "./index.scss";

@observer
class Vols extends React.Component {
  static renderEmpty = () => {
    return <h1>EMPTY</h1>;
  };

  static renderVols = (vols: VolInfo[]) => {
    return vols.map((vol: VolInfo, index: number) => (
      <VolItem key={vol.id} volInfo={vol} index={index} />
    ));
  };

  render() {
    const { displayVols } = volStore;
    if (!displayVols.length) {
      return Vols.renderEmpty();
    }
    return (
      <div
        id="vols"
        className={`page show view-${ViewTypes.VOLS}`}
        style={{ zIndex: 1 }}
      >
        {Vols.renderVols(displayVols)}
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
}

export { Vols };
