import * as React from "react";
import anime from "animejs";
import { observer } from "mobx-react";
import { articleStore, playerStore, store } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { ArticleTrackItem } from "../../components/article-track-item";
import { ElementPosition, ViewTypes } from "../../types";
import { events, EventTypes, px } from "../../utils";
import "./index.scss";

let infoRef: HTMLDivElement;
let tracksRef: HTMLDivElement;
let coverRef: HTMLDivElement;
let coverPos: ElementPosition;

function getCoverRef(i: HTMLImageElement | null) {
  coverRef = i as HTMLDivElement;
}

function getInfoRef(i: HTMLDivElement | null) {
  infoRef = i as HTMLDivElement;
}

function getTracksRef(i: HTMLDivElement | null) {
  tracksRef = i as HTMLDivElement;
}

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

      <div id="article-info" ref={getInfoRef}>
        <p id="article-info-title">
          {article.title}
          <Icon type={IconTypes.LIKE} />
          {playerStore.isArticlePlaying(article.id) ? (
            <Icon type={IconTypes.PAUSE} onClick={playerStore.pause} />
          ) : (
            <Icon
              type={IconTypes.PLAY}
              onClick={() => playerStore.playArticleTrack(article.id)}
            />
          )}
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

      <div id="article-tracks" ref={getTracksRef}>
        {article.tracks.map((t, index) => (
          <ArticleTrackItem
            key={t.id}
            trackInfo={t}
            isLiked={false}
            isPlaying={playerStore.isArticleTrackPlaying(article.id, index)}
            onPause={playerStore.pause}
            onPlay={() => playerStore.playArticleTrack(article.id, index)}
            onClick={() => {
              store.toggleShowPlayer(true);
              return playerStore.playArticleTrack(article.id, index);
            }}
          />
        ))}
      </div>
    </div>
  );
}

const Article = observer(IArticle);

events.on(EventTypes.ShowArticleBackground, (src, cover, callback) => {
  const { top, right, bottom, left } = cover.getBoundingClientRect();
  coverPos = { top, right, bottom, left } as ElementPosition;

  coverRef.style.backgroundImage = `url(${src})`;
  coverRef.style.opacity = "1";
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
    begin: callback
  });
});

events.on(EventTypes.ScrollBackArticle, () => {
  infoRef.scrollTo(0, 0);
  tracksRef.scrollTo(0, 0);
});

export { Article };
