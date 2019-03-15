import * as React from "react";
import { observer } from "mobx-react";
import {
  articleStore,
  Pagination as PaginationStore,
  store
} from "../../store";
import { ArticleItem } from "../../components/article-item";
import { Pagination } from "../../components/pagination";
import { ArticleInfo, ViewTypes } from "../../types";
import { Route } from "../../components/route";
import "./index.scss";

let articlesRef: HTMLDivElement;

function getArticlesRef(i: HTMLDivElement) {
  articlesRef = i as HTMLDivElement;
}

function renderArticles(articles: Maybe<ArticleInfo[]>) {
  if (!articles) {
    return null;
  }
  return articles.map((article: ArticleInfo, index: number) => (
    <ArticleItem
      key={article.id}
      id={article.id}
      cover={article.cover}
      title={article.title}
      color={article.color}
      metaInfo={article.metaInfo}
      isPlaying={false}
      isLiked={false}
      onToggle={() => {}}
    />
  ));
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
