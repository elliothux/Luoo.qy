import * as React from "react";
import anime from "animejs";
import {observer} from "mobx-react";
import {articleStore} from "../../store";
import {Icon, IconTypes} from "../../components/icon";
import {ArticleTrackItem} from "../../components/article-track-item";
import {ViewTypes, ElementPosition} from "../../types";
import {events, EventTypes, px} from "../../utils";
import "./index.scss";


let coverRef: HTMLDivElement;
let coverPos: ElementPosition;

function getCoverRef(i: HTMLImageElement | null) {
    coverRef = i as HTMLDivElement
}

events.on(EventTypes.ShowArticleBackground, (src, cover, callback) => {
    const { top, right, bottom, left } = cover.getBoundingClientRect();
    coverPos = { top, right, bottom, left} as ElementPosition;

    coverRef.style.backgroundImage = `url(${src})`;
    coverRef.style.opacity = '1';
    coverRef.style.top = px(top);
    coverRef.style.left = px(left);
    coverRef.style.width = px(right - left);
    coverRef.style.height = px(bottom - top);

    anime({
        targets: coverRef,
        easing: "easeInOutExpo",
        width: "100%",
        height: "100%",
        duration: 600,
        top: 0,
        left: 0,
        begin: callback,
    });
});

function IArticle() {
  const { selectedArticle: article } = articleStore;
  if (!article) return null;
  return (
    <div id="article" className={`page view-${ViewTypes.ARTICLE_INFO}`}>
      <div
        id="article-bg"
        ref={getCoverRef}
        style={{
          backgroundImage: `url(${article.cover})`
        }}
      />
      <div id="article-bg-mask" />
      <div id="article-info">
        <p id="article-info-title">
          {article.title}
          <Icon type={IconTypes.LIKE} />
          <Icon type={IconTypes.PLAY} />
        </p>
        <p id="article-info-meta">{article.metaInfo}</p>
        <div
          id="article-info-desc"
          dangerouslySetInnerHTML={{
            __html: article.desc
          }}
        />
        <div id="article-info-date">
          <Icon type={IconTypes.LOGO} />
          <span id="article-info-author">{article.author} · </span>
          <span id="article-info-date">{article.date}</span>
        </div>
      </div>
      <div id="article-tracks">
        {article.tracks.map(t => (
          <ArticleTrackItem key={t.id} trackInfo={t} />
        ))}
      </div>
    </div>
  );
}

const Article = observer(IArticle);

export { Article };
