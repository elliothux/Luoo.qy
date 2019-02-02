import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { store } from "../../store";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

function genRange(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function genPages(currentPage: number, totalPage: number): number[] {
  const displayPages = 9;
  const s = (displayPages - 1) / 2;
  if (currentPage - s < 0) {
    return genRange(0, 9);
  }
  if (currentPage + s > totalPage) {
    return genRange(totalPage - displayPages, totalPage);
  }
  return genRange(currentPage - s, currentPage + s);
}

function IPagination() {
  const { volCurrentPage, volTotalPage } = store;
  const pages: number[] = genPages(volCurrentPage, volTotalPage);
  return (
    <div id="pagination">
      <Icon type={IconTypes.ARROW_LEFT} />
      {pages.map(p => (
        <span
          key={p}
          className={classnames({
            "pagination-item": true,
            activated: p === volCurrentPage
          })}
        >
          {p + 1}
        </span>
      ))}
      <Icon type={IconTypes.ARROW_RIGHT} />
    </div>
  );
}

const Pagination = observer(IPagination);

export { Pagination };
