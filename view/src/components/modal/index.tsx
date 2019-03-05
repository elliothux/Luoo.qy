import * as React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

class Modal extends React.Component {
  el: HTMLDivElement = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export { Modal };
