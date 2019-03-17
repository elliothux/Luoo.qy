import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { volStore } from "../../store";
import "./index.scss";

export interface Props {
  id: ID;
  cover: Cover;
  title: Title;
  tags: Tag[];
  color: Color;
  vol: number;
  isPlaying: boolean;
  isLiked: boolean;
  onToggle: () => void;
}

class VolItem extends React.PureComponent<Props> {
  private onClick = () => {
    const { id } = this.props;
    volStore.setItem(id);
  };

  public render() {
    const {
      cover,
      title,
      vol,
      tags,
      color,
      isPlaying,
      isLiked,
      onToggle
    } = this.props;
    return (
      <div className="vol-item" onClick={this.onClick}>
        <div
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
            <Icon
              type={isLiked ? IconTypes.LIKE : IconTypes.LIKE}
              preventDefault
            />
            <Icon
              type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={onToggle}
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
