import * as React from "react";
import { ViewTypes } from "../../types";
import { Ref } from "react";

export interface RouteProps {
  currentView: ViewTypes;
  view: ViewTypes;
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  getRef?: Ref<HTMLDivElement>;
}

const hideStyle = {
  zIndex: -2,
  opacity: 0,
  transform: "scale(0.9)",
  transition: "all ease 500ms"
};

const showStyle = {
  zIndex: 5,
  opacity: 1,
  transform: "none",
  transition: "all ease 800ms"
};

class Route extends React.PureComponent<RouteProps> {
  state = {
    style: this.props.currentView === this.props.view ? showStyle : hideStyle
  };

  componentWillReceiveProps(nextProps: Readonly<RouteProps>): void {
    const { currentView } = this.props;
    const { currentView: nextView, view } = nextProps;
    if (currentView === nextView) {
      return;
    }
    if (view === currentView) {
      this.setState({ style: hideStyle });
    }
    if (view === nextView) {
      setTimeout(() => this.setState({ style: showStyle }), 300);
    }
  }

  render() {
    const { style: iStyle } = this.state;
    const { children, id, className, style, getRef } = this.props;
    const elemProps = {
      id,
      className,
      style: { ...style, ...iStyle },
      ref: getRef
    };
    return <div {...elemProps}>{children}</div>;
  }
}

export { Route };
