import * as React from "react";
import { ArticleInfo } from "../../types";
import { Icon, IconTypes } from "../icon";
import { articleStore, playerStore } from "../../store";
import { events, EventTypes } from "../../utils";
import "./index.scss";

export interface Props {
  articleInfo: ArticleInfo;
  index: number;
  isPlaying: boolean;
  isLiked: boolean;
}

let coverRef: HTMLImageElement;

function getCoverRef(i: HTMLImageElement | null) {
  coverRef = i as HTMLImageElement;
}

function onClick(cover: string, index: number) {
  events.emit(EventTypes.ShowArticleBackground, cover, coverRef, () => {
    events.emit(EventTypes.ScrollBackArticle);
    articleStore.selectArticle(index);
  });
}

function ArticleItem(props: Props) {
  const { articleInfo, isPlaying, isLiked, index } = props;
  return (
    <div
      className="article-item"
      onClick={() => onClick(articleInfo.cover, index)}
    >
      <div
        ref={getCoverRef}
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

export { ArticleItem };
