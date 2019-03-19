import * as React from "react";
import { observer } from "mobx-react";
import {
  articleStore,
  collectionArticleStore,
  playerStore,
  store
} from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import {
  ArticleInfo,
  ArticleTrack,
  PlayingTypes,
  ViewTypes
} from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import { TrackItem } from "../../components/track-item";
import "./index.scss";
import {ipcUtils, scrollToTop} from "../../utils";

let infoRef: Maybe<HTMLDivElement> = null;
let tracksRef: Maybe<HTMLDivElement> = null;

function renderTracks(article: ArticleInfo) {
  const tracks = article.tracks as ArticleTrack[];
  const ids = tracks.map(i => i.id);

  return tracks.map(track => {
    const { id } = track;
    const isPlaying = playerStore.isTrackPlaying(id);

    const onPlay = async () => {
      await playerStore.setPlayingIds(
        ids,
        id,
        PlayingTypes.ARTICLE,
        article.id
      );
      return playerStore.play();
    };

    const onClick = () => {
      playerStore.toggleShowPlayer(true);
      if (!isPlaying) {
        return onPlay();
      }
    };

    return (
      <TrackItem
        key={track.id}
        name={track.name}
        artist={track.artist}
        album={track.album}
        cover={track.cover}
        isPlaying={isPlaying}
        isLiked={collectionArticleStore.isLiked(id)}
        onClick={onClick}
        onPlay={onPlay}
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

  const { id } = article;
  const isPlaying = playerStore.isArticlePlaying(id);
  const isLiked = collectionArticleStore.isLiked(id);

  const onPlay = async () => {
    const ids = await ipcUtils.getTrackIdsByArticleId(id);
    playerStore.setPlayingIds(ids, null, PlayingTypes.ARTICLE, id);
  };

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
          <Icon type={isLiked ? IconTypes.LIKED : IconTypes.LIKE} />
          <Icon
            type={isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
            onClick={isPlaying ? playerStore.pause : onPlay}
          />
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
    scrollToTop(infoRef, false);
    scrollToTop(tracksRef, false);
  }
});

const Article = observer(IArticle);

export { Article };
