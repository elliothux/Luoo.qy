import * as React from "react";
import { observer } from "mobx-react";
import classnames from "classnames";
import { volStore } from "../../store";
import { Icon, IconTypes } from "../icon";
import "./index.scss";

const noop = () => {};

interface Props {
  pages: number[];
  currentPage: number;
  togglePage: (index: number) => void;
  paginationCurrentIndex: number;
  paginationTotalIndex: number;
  onNext: () => void;
  onPre: () => void;
}

function IPagination(props: Props) {
  const isFirst = props.paginationCurrentIndex === 0;
  const isLast =
    props.paginationCurrentIndex + 1 === props.paginationTotalIndex;
  return (
    <div id="pagination">
      <Icon
        type={IconTypes.ARROW_LEFT}
        className={classnames({ disable: isFirst })}
        onClick={isFirst ? noop : props.onPre}
      />
      {props.pages.map(p => (
        <span
          key={p}
          className={classnames({
            "pagination-item": true,
            activated: p === props.currentPage
          })}
          onClick={() => props.togglePage(p)}
        >
          {p + 1}
        </span>
      ))}
      <Icon
        type={IconTypes.ARROW_RIGHT}
        className={classnames({ disable: isLast })}
        onClick={isLast ? noop : props.onNext}
      />
    </div>
  );
}

const Pagination = observer(IPagination);

export { Pagination };
