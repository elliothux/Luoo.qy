import * as React from "react";
import { observer } from "mobx-react";
import {collectionArticleStore, playerStore} from "../../store";
import { Loading } from "../loading";
import { Empty } from "../empty";
import { Pagination } from "../pagination";
import {ArticleInfo, PlayingTypes} from "../../types";
import { ArticleItem } from "../article-item";
import "./index.scss";
import {ipcUtils, scrollToTop} from "../../utils";

let containerRef: HTMLDivElement;

function getContainerRef(i: HTMLDivElement) {
  containerRef = i;
}

function renderArticles(articles: ArticleInfo[]) {
  return articles.map((article: ArticleInfo) => {
    const { id } = article;
    const onPlay = async () => {
      const ids = await ipcUtils.getTrackIdsByArticleId(id);
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
  });
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
    <div id="user-collection-articles" ref={getContainerRef}>
      {renderArticles(displayedItems)}
      <Pagination store={pagination} />
    </div>
  );
}

collectionArticleStore.pagination.onChangePage(() => {
  scrollToTop(containerRef);
});

const UserCollectionArticles = observer(IUserCollectionArticles);

export { UserCollectionArticles };
