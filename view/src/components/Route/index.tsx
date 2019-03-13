import * as React from "react";
import { ViewTypes } from "../../types";
import {Ref} from "react";

export interface RouteProps {
  view: ViewTypes;
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  getRef?: Ref<HTMLDivElement>;
}

class Route extends React.Component<RouteProps> {
  render() {
    const { view, children, id, className, style, getRef } = this.props;
    const elemProps = { id, className, style, ref: getRef };
    return <div {...elemProps}>{children}</div>;
  }
}

export { Route };
