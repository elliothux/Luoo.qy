import * as React from "react";
import { observer } from "mobx-react";
import { articleStore, store } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { ArticleInfo, ViewTypes } from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import { TrackItem } from "../../components/track-item";
import "./index.scss";

let infoRef: Maybe<HTMLDivElement> = null;
let tracksRef: Maybe<HTMLDivElement> = null;

function renderTracks(article: Maybe<ArticleInfo>) {
  if (!article || !article.tracks) {
    return <Loading />;
  }
  return article.tracks.map(track => {
    return (
      <TrackItem
        key={track.id}
        name={track.name}
        artist={track.artist}
        album={track.album}
        cover={track.cover}
        isPlaying={false}
        isLiked={false}
        onToggle={() => {}}
        onClick={() => {}}
      />
    );
  });
}

function IArticle() {
  const { displayedItem: article } = articleStore;
  if (!article) {
    return (
      <Route
        currentView={store.view}
        view={ViewTypes.ARTICLE_INFO}
        id="article"
      >
        <Loading />
      </Route>
    );
  }
  if (store.view === ViewTypes.ARTICLE_INFO) {
    store.setBackgroundImage(article.cover);
  }

  return (
    <Route currentView={store.view} view={ViewTypes.ARTICLE_INFO} id="article">
      <div
        id="article-bg"
        style={{
          backgroundImage: `url(${article.cover})`
        }}
      />

      <div id="article-bg-mask" />

      <div id="article-info" ref={i => (infoRef = i)}>
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

      <div id="article-tracks" ref={i => (tracksRef = i)}>
        {renderTracks(article)}
      </div>
    </Route>
  );
}

store.onChangeView(view => {
  if (infoRef && tracksRef && view === ViewTypes.ARTICLE_INFO) {
    infoRef.scroll(0, 0);
    tracksRef.scroll(0, 0);
  }
});

const Article = observer(IArticle);

export { Article };
