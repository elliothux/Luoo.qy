import * as React from "react";
import { Icon, IconTypes } from "../icon";
import { articleStore, playerStore } from "../../store";
import { events, EventTypes, isAnyPartOfElementInViewport } from "../../utils";
import { ArticleInfo } from "../../@types";
import "./index.scss";

export interface Props {
  articleInfo: ArticleInfo;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
}

class ArticleItem extends React.Component<Props> {
  componentDidMount(): void {
    events.on(EventTypes.SelectArticle, this.onEmitSelectArticle);
  }
  componentWillUnmount(): void {
    events.cancel(EventTypes.SelectArticle, this.onEmitSelectArticle);
  }

  private coverRef: HTMLImageElement | null = null;

  private getCoverRef = (i: HTMLImageElement | null) => {
    if (i) {
      this.coverRef = i;
    }
  };

  private onEmitSelectArticle = (index: number) => {
    if (index === this.props.index) {
      const cover = this.coverRef as HTMLImageElement;
      if (isAnyPartOfElementInViewport(cover)) {
        setTimeout(this.onClick, 300);
      } else {
        cover.scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(this.onClick, 600);
      }
    }
  };

  private onClick = () => {
    events.emit(
      EventTypes.ShowArticleBackground,
      this.props.articleInfo.cover,
      this.coverRef,
      () => {
        events.emit(EventTypes.ScrollBackArticle);
        articleStore.selectArticle(this.props.index);
      }
    );
  };

  public render() {
    const { articleInfo, isPlaying } = this.props;
    return (
      <div className="article-item" onClick={this.onClick}>
        <div
          ref={this.getCoverRef}
          className="article-item-cover"
          style={{
            backgroundImage: `url(${articleInfo.cover})`
          }}
        />
        <div className="article-item-info">
          <div className="article-item-info-container">
            <p className="article-item-info-title">{articleInfo.title}</p>
            <p className="article-item-info-meta">{articleInfo.metaInfo}</p>
          </div>
          <div className="article-item-operation">
            <Icon type={IconTypes.LIKE} />
            {isPlaying ? (
              <Icon
                type={IconTypes.PAUSE}
                onClick={playerStore.pause}
                preventDefault
              />
            ) : (
              <Icon
                type={IconTypes.PLAY}
                onClick={() => playerStore.playArticleTrack(articleInfo.id)}
                preventDefault
              />
            )}
          </div>
        </div>
        <div
          className="article-item-bg"
          style={{ backgroundColor: articleInfo.color }}
        />
      </div>
    );
  }
}

export { ArticleItem };
