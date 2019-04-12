import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, searchArticleStore } from "../../store";
import { PlayingTypes } from "../../types";
import { ArticleItem } from "../article-item";
import { Loading } from "../loading";
import { Empty } from "../empty";
import {Pagination} from "../pagination";

import "./index.scss";
import {scrollToTop} from "../../utils";


let containerRef: HTMLDivElement;

function getContainerRef(i: HTMLDivElement) {
  containerRef = i;
}

function ISearchResultArticle() {
  const { displayedItems, isLoading, pagination } = searchArticleStore;
  const id = "article-search-result-content";

  if (isLoading) {
    return <Loading id={id} />;
  }
  if (displayedItems.length === 0) {
    return <Empty id={id} />;
  }

  return (
    <div id={id} ref={getContainerRef}>
      {displayedItems.map(article => {
        const { id } = article;
        const onPlay = async () => {
          const ids = searchArticleStore.getIds();
          playerStore.setPlayingIds(ids, null, PlayingTypes.ARTICLE, id);
        };

        return (
          <ArticleItem
            key={article.id}
            id={article.id}
            cover={article.cover}
            title={article.title}
            color={article.color}
            metaInfo={article.metaInfo}
            isPlaying={playerStore.isArticlePlaying(id)}
            isLiked={true}
            onPlay={onPlay}
          />
        );
      })}
      <Pagination store={pagination} />
    </div>
  );
}

searchArticleStore.pagination.onChangePage(() => {
  scrollToTop(containerRef);
});

const SearchResultArticle = observer(ISearchResultArticle);

export { SearchResultArticle };
