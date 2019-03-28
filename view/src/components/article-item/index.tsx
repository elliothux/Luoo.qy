import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { articleStore, collectionArticleStore, playerStore } from "../../store";
import "./index.scss";
import {observer} from "mobx-react";

export interface Props {
  id: ID;
  cover: Cover;
  title: Title;
  color: Color;
  metaInfo: string;
  isPlaying: boolean;
  isLiked?: boolean;
  onPlay: () => void;
  onPause?: () => void;
}

@observer
class ArticleItem extends React.Component<Props> {
  private onClick = () => {
    const { id } = this.props;
    articleStore.setItem(id);
  };

  private get isLiked(): boolean {
    const { id, isLiked } = this.props;
    if (typeof isLiked === "boolean") {
      return isLiked;
    }
    return collectionArticleStore.isLiked(id);
  }

  private get isFetchingLike(): boolean {
    const { id } = this.props;
    return collectionArticleStore.isFetchingLike(id);
  }

  private onToggleLike = () => {
    if (this.isFetchingLike) {
      return;
    }
    const { id } = this.props;
    return collectionArticleStore.toggleLike(id, this.isLiked);
  };

  public render() {
    const {
      cover,
      title,
      color,
      metaInfo,
      isPlaying,
      onPlay,
      onPause = playerStore.pause
    } = this.props;
    return (
      <div className="article-item" onClick={this.onClick}>
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
            <Icon
              type={
                this.isFetchingLike
                  ? IconTypes.LOADING
                  : this.isLiked
                    ? IconTypes.LIKED
                    : IconTypes.LIKE
              }
              onClick={this.onToggleLike}
              animate
              preventDefault
            />
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
