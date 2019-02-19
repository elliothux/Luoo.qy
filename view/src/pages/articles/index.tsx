import * as React from "react";
import { observer } from "mobx-react";
import { articleStore, playerStore } from "../../store";
import { ArticleItem } from "../../components/article-item";
import { Pagination } from "../../components/pagination";
import { ViewTypes, ArticleInfo } from "../../types";
import "./index.scss";

@observer
class Articles extends React.Component {
  static renderEmpty = () => {
    return <h1>EMPTY</h1>;
  };

  static renderArticles = (articles: ArticleInfo[]) => {
    return articles.map((article: ArticleInfo, index: number) => (
      <ArticleItem
        key={article.id}
        articleInfo={article}
        index={index}
        isPlaying={playerStore.isArticlePlaying(article.id)}
        isLiked={false}
      />
    ));
  };

  render() {
    const { displayArticles } = articleStore;
    if (!displayArticles.length) {
      return Articles.renderEmpty();
    }
    return (
      <div id="articles" className={`page view-${ViewTypes.ARTICLES}`}>
        {Articles.renderArticles(displayArticles)}
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
}

export { Articles };
