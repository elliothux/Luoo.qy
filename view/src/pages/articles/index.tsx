import * as React from "react";
import { observer } from "mobx-react";
import { articleStore, playerStore } from "../../store";
import { ArticleItem } from "../../components/article-item";
import { Pagination } from "../../components/pagination";
import { events, EventTypes } from "../../utils";
import { ViewTypes, ArticleInfo } from "../../@types";
import "./index.scss";

let articlesRef: HTMLDivElement;

function getArticlesRef(i: Maybe<HTMLDivElement>) {
  articlesRef = i as HTMLDivElement;
}

function renderArticles(articles: ArticleInfo[]) {
  return articles.map((article: ArticleInfo, index: number) => (
    <ArticleItem
      key={article.id}
      articleInfo={article}
      index={index}
      isPlaying={playerStore.isArticlePlaying(article.id)}
      isLiked={false}
    />
  ));
}

function IArticles() {
  const { displayArticles } = articleStore;
  return (
    <div
      id="articles"
      className={`page view-${ViewTypes.ARTICLES}`}
      ref={getArticlesRef}
    >
      {renderArticles(displayArticles)}
      <Pagination
        pages={articleStore.displayArticlePaginations}
        currentPage={articleStore.articleCurrentPage}
        togglePage={articleStore.toggleArticleIndex}
        paginationCurrentIndex={articleStore.articlePaginationCurrentIndex}
        paginationTotalIndex={articleStore.articlePaginationTotalIndex}
        onNext={articleStore.nextArticlePagination}
        onPre={articleStore.preArticlePagination}
      />
    </div>
  );
}

const Articles = observer(IArticles);

events.on(EventTypes.ScrollBackArticles, (smooth: boolean = false) => {
  if (smooth) {
    articlesRef.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  } else {
    articlesRef.scrollTo(0, 0);
  }
});

export { Articles };
