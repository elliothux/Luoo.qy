import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { store } from "../../store";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

const noop = () => {};

function IPagination() {
  const {
    displayVolPaginations: pages,
    volCurrentPage,
    toggleVolIndex,
    volPaginationCurrentIndex,
      volPaginationTotalIndex,
    nextVolPagination,
    preVolPagination
  } = store;
  const isFirst = volPaginationCurrentIndex === 0;
  const isLast = volPaginationCurrentIndex + 1 === volPaginationTotalIndex;
  return (
    <div id="pagination">
      <Icon
        type={IconTypes.ARROW_LEFT}
        className={classnames({ disable: isFirst })}
        onClick={isFirst ? noop : preVolPagination}
      />
      {pages.map(p => (
        <span
          key={p}
          className={classnames({
            "pagination-item": true,
            activated: p === volCurrentPage
          })}
          onClick={() => toggleVolIndex(p)}
        >
          {p + 1}
        </span>
      ))}
      <Icon
        type={IconTypes.ARROW_RIGHT}
        className={classnames({ disable: isLast })}
        onClick={isLast ? noop : nextVolPagination}
      />
    </div>
  );
}

const Pagination = observer(IPagination);

export { Pagination };
