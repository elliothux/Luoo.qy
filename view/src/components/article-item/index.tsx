import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { articleStore } from "../../store";
import "./index.scss";

export interface Props {
  id: ID;
  cover: Cover;
  title: Title;
  color: Color;
  metaInfo: string;
  isPlaying: boolean;
  isLiked: boolean;
  onPlay: () => void;
  onPause: () => void;
}

class ArticleItem extends React.PureComponent<Props> {
  public render() {
    const {
      id,
      cover,
      title,
      color,
      metaInfo,
      isPlaying,
      isLiked,
      onPlay,
        onPause
    } = this.props;
    return (
      <div className="article-item" onClick={() => articleStore.setItem(id)}>
        <div
          className="article-item-cover"
          style={{
            backgroundImage: `url(${cover})`
          }}
        />
        <div className="article-item-info">
          <div className="article-item-info-container">
            <p className="article-item-info-title">{title}</p>
            <p className="article-item-info-meta">{metaInfo}</p>
          </div>
          <div className="article-item-operation">
            <Icon type={isLiked ? IconTypes.LIKED : IconTypes.LIKE} />
            <Icon
              type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={isPlaying ? onPause : onPlay}
              preventDefault
            />
          </div>
        </div>
        <div className="article-item-bg" style={{ backgroundColor: color }} />
      </div>
    );
  }
}

export { ArticleItem };
