import * as React from "react";
import { observer } from "mobx-react";
import { collectionArticleStore } from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import { Pagination } from "../pagination";
import { ArticleInfo } from "../../types";
import { ArticleItem } from "../article-item";
import "./index.scss";

function renderArticles(articles: ArticleInfo[]) {
  return articles.map((article: ArticleInfo) => (
    <ArticleItem
      key={article.id}
      id={article.id}
      cover={article.cover}
      title={article.title}
      color={article.color}
      metaInfo={article.metaInfo}
      isPlaying={false}
      isLiked={false}
      onPlay={() => {}}
      onPause={() => {}}
    />
  ));
}

function IUserCollectionArticles() {
  const { isFetching, pagination, displayedItems } = collectionArticleStore;

  if (isFetching) {
    return <Loading />;
  }

  if (displayedItems.length === 0) {
    return <Empty />;
  }

  return (
    <div id="user-collection-articles">
      {renderArticles(displayedItems)}
      <Pagination store={pagination} />
    </div>
  );
}

const UserCollectionArticles = observer(IUserCollectionArticles);

export { UserCollectionArticles };
