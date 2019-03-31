import * as React from "react";
import { observer } from "mobx-react";
import {playerStore, searchArticleStore} from "../../store";
import {ipcUtils} from "../../utils";
import { PlayingTypes } from "../../types";
import {ArticleItem} from "../article-item";


function ISearchResultArticle() {
  const { displayedItems } = searchArticleStore;
  return (
    <div id="article-search-result-content">
      {displayedItems.map(article => {
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
      })}
    </div>
  );
}

const SearchResultArticle = observer(ISearchResultArticle);

export { SearchResultArticle };
