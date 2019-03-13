import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { events, EventTypes, isAnyPartOfElementInViewport } from "../../utils";
import { VolInfo } from "../../types";
import "./index.scss";
import { RefObject } from "react";
import { volStore } from "../../store";

export interface Props {
  id: ID;
  cover: Cover;
  title: Title;
  tags: Tag[];
  color: Color;
  vol: number;
  isPlaying: boolean;
  isLiked: boolean;
}

class VolItem extends React.PureComponent<Props> {
  coverRef: RefObject<HTMLDivElement> = React.createRef();

  public render() {
    const {
      id,
      cover,
      title,
      vol,
      tags,
      color,
      isPlaying,
      isLiked
    } = this.props;
    return (
      <div className="vol-item" onClick={() => volStore.setItem(id)}>
        <div
          ref={this.coverRef}
          className="vol-item-cover"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
        <div className="vol-item-info">
          <p className="vol-item-info-index">
            vol.
            {vol}
          </p>
          <p className="vol-item-info-title">{title}</p>
          <div className="vol-item-operation">
            <Icon type={IconTypes.LIKE} preventDefault />
            <Icon
              type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              preventDefault
            />
          </div>
        </div>
        <div className="vol-item-tags">
          {tags.map(t => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <div className="vol-item-bg" style={{ backgroundColor: color }} />
      </div>
    );
  }
}

export { VolItem };
