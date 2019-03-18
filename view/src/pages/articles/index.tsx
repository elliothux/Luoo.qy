import * as React from "react";
import {observer} from "mobx-react";
import {articleStore, collectionArticleStore, playerStore, store} from "../../store";
import {ArticleItem} from "../../components/article-item";
import {Pagination} from "../../components/pagination";
import {ArticleInfo, PlayingTypes, ViewTypes} from "../../types";
import {Route} from "../../components/route";
import "./index.scss";
import {ipcUtils} from "../../utils";

let articlesRef: HTMLDivElement;

function getArticlesRef(i: HTMLDivElement) {
  articlesRef = i as HTMLDivElement;
}

function renderArticles(articles: Maybe<ArticleInfo[]>) {
  if (!articles) {
    return null;
  }
  return articles.map((article: ArticleInfo) => {
    const { id } = article;
    const onPlay = async () => {
      const ids = await ipcUtils.getTrackIdsByArticleId(id);
      playerStore.setPlayingIds(ids, null, PlayingTypes.ARTICLE, id);
    };

    return (
        <ArticleItem
            key={id}
            id={article.id}
            cover={article.cover}
            title={article.title}
            color={article.color}
            metaInfo={article.metaInfo}
            isPlaying={playerStore.isArticlePlaying(id)}
            isLiked={collectionArticleStore.isLiked(id)}
            onPlay={onPlay}
            onPause={playerStore.pause}
        />
    )
  });
}

function IArticles() {
  const { displayedItems, pagination } = articleStore;
  return (
    <Route
      currentView={store.view}
      view={ViewTypes.ARTICLES}
      id="articles"
      getRef={getArticlesRef}
    >
      {renderArticles(displayedItems)}
      <Pagination store={pagination} />
    </Route>
  );
}

const Articles = observer(IArticles);

export { Articles };
