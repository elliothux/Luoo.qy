import * as React from "react";
import { observer } from "mobx-react";
import { playerStore, searchArticleStore } from "../../store";
import { PlayingTypes } from "../../types";
import { ArticleItem } from "../article-item";
import { Loading } from "../loading";
import { Empty } from "../empty";

import "./index.scss";
import {Pagination} from "../pagination";


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
    <div id={id}>
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

const SearchResultArticle = observer(ISearchResultArticle);

export { SearchResultArticle };
