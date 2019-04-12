import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { Pagination as PaginationStore } from "../../store/pagination";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

interface Props {
  store: PaginationStore;
}

function IPagination({ store }: Props) {
  const {
    hasNext,
    hasPre,
    changeCurrentPage,
    nextPagination,
    prePagination,
    displayPaginations,
    currentPage
  } = store;

  return (
    <div className="pagination">
      <Icon
        type={IconTypes.ARROW_LEFT}
        className={classnames({ disable: !hasPre })}
        onClick={prePagination}
      />
      {displayPaginations.map(p => (
        <span
          key={p}
          className={classnames({
            "pagination-item": true,
            activated: p === currentPage
          })}
          onClick={() => changeCurrentPage(p)}
        >
          {p + 1}
        </span>
      ))}
      <Icon
        type={IconTypes.ARROW_RIGHT}
        className={classnames({ disable: !hasNext })}
        onClick={nextPagination}
      />
    </div>
  );
}

const Pagination = observer(IPagination);

export { Pagination };
