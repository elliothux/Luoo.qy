import * as React from "react";
import { Single } from "../../types";
import { Icon, IconTypes } from "../icon";
import { volStore } from "../../store";
import { events, EventTypes, px } from "../../utils";
import "./index.scss";

export interface Props {
  singleInfo: Single;
  index: number;
}

class SingleItem extends React.Component<Props> {
  private onClick = () => {

  };

  public render() {
    const { singleInfo } = this.props;
    return (
      <div className="single-item" onClick={this.onClick}>
          <h1>{singleInfo.name}</h1>
      </div>
    );
  }
}

export { SingleItem };
