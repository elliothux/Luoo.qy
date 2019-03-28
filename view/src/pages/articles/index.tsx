import * as React from "react";
import {observer} from "mobx-react";
import {articleStore, collectionArticleStore, playerStore, store} from "../../store";
import {ArticleItem} from "../../components/article-item";
import {Pagination} from "../../components/pagination";
import {ArticleInfo, PlayingTypes, ViewTypes} from "../../types";
import {Route} from "../../components/route";
import "./index.scss";
import {ipcUtils, scrollToTop} from "../../utils";

let containerRef: HTMLDivElement;

function getContainerRef(i: HTMLDivElement) {
  containerRef = i;
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
            onPlay={onPlay}
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
      getRef={getContainerRef}
    >
      {renderArticles(displayedItems)}
      <Pagination store={pagination} />
    </Route>
  );
}

articleStore.pagination.onChangePage(() => scrollToTop(containerRef));

const Articles = observer(IArticles);

export { Articles };
