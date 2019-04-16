import * as React from "react";
import { observer } from "mobx-react";
import {
  articleStore,
  collectionArticleStore,
  playerStore,
  store
} from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { ArticleTrack, PlayingTypes, ViewTypes } from "../../types";
import { Route } from "../../components/route";
import { Loading } from "../../components/loading";
import { TrackItem } from "../../components/track-item";
import { scrollToTop } from "../../utils";
import { RefObject } from "react";
import "./index.scss";

@observer
class Article extends React.Component {
  private infoRef: RefObject<HTMLDivElement> = React.createRef();
  private tracksRef: RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    store.onChangeView(view => {
      const {
        infoRef: { current: infoRef },
        tracksRef: { current: tracksRef }
      } = this;
      if (infoRef && tracksRef && view === ViewTypes.ARTICLE_INFO) {
        scrollToTop(infoRef, false);
        scrollToTop(tracksRef, false);
      }
    });
  }

  private static get id(): ID {
    const { displayedItem: article } = articleStore;
    return article ? article.id : 0;
  }

  private static get trackIds(): ID[] {
    const { displayedItem: article } = articleStore;
    if (!article || !article.tracks) {
      return [];
    }
    return article.tracks.map(i => i.id);
  }

  private static get isPlaying(): boolean {
    const { id } = Article;
    return id ? playerStore.isArticlePlaying(id) : false;
  }

  private static get isLiked(): boolean {
    const { id } = Article;
    return id ? collectionArticleStore.isLiked(id) : false;
  }

  private static get isFetchingLike(): boolean {
    const { id } = Article;
    return id ? collectionArticleStore.isFetchingLike(id) : false;
  }

  private static onTogglePlay = () => {
    if (Article.isPlaying) {
      return playerStore.pause();
    }

    const { displayedItem: article } = articleStore;
    if (!article) {
      return;
    }
    const tracks = article.tracks as ArticleTrack[];
    const ids = tracks.map(i => i.id);
    playerStore.setPlayingIds(ids, null, PlayingTypes.ARTICLE, article.id);
  };

  private static onToggleLike = () => {
    if (Article.isFetchingLike) {
      return;
    }
    return collectionArticleStore.toggleLike(Article.id, Article.isLiked);
  };

  private static onPlayTrack = async (track: ArticleTrack) => {
    const { id } = track;
    await playerStore.setPlayingIds(
      Article.trackIds,
      id,
      PlayingTypes.ARTICLE,
      Article.id
    );
    return playerStore.play();
  };

  private static onClickTrack = async (track: ArticleTrack) => {
    playerStore.toggleShowPlayer(true);
    if (!Article.isPlaying) {
      return Article.onPlayTrack(track);
    }
  };

  private static renderTracks = (tracks: ArticleTrack[]) => {
    return tracks.map(track => {
      const { id } = track;
      const isPlaying = playerStore.isTrackPlaying(id);

      return (
        <TrackItem
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          cover={track.cover}
          isPlaying={isPlaying}
          isLiked={collectionArticleStore.isLiked(id)}
          onPlay={() => Article.onPlayTrack(track)}
          onClick={() => Article.onClickTrack(track)}
        />
      );
    });
  };

  private static renderLoading = () => (
    <Route currentView={store.view} view={ViewTypes.ARTICLE_INFO} id="article">
      <Loading />
    </Route>
  );

  public render() {
    const { displayedItem: article } = articleStore;

    if (!article) {
      return Article.renderLoading();
    }

    return (
      <Route
        currentView={store.view}
        view={ViewTypes.ARTICLE_INFO}
        id="article"
      >
        <div
          id="article-bg"
          style={{
            backgroundImage: `url(${article.cover})`
          }}
        />

        <div id="article-bg-mask" />

        <div id="article-info" ref={this.infoRef}>
          <p id="article-info-title">
            {article.title}
            <Icon type={IconTypes.DOWNLOAD}/>
            <Icon type={Article.isLiked ? IconTypes.LIKED : IconTypes.LIKE} />
            <Icon
              type={Article.isPlaying ? IconTypes.PAUSE : IconTypes.PLAY}
              onClick={Article.onTogglePlay}
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

        <div id="article-tracks" ref={this.tracksRef}>
          {article.tracks ? Article.renderTracks(article.tracks) : null}
        </div>
      </Route>
    );
  }
}

export { Article };
