import { app } from "electron";
import { insert, find, isExist, findOne, getDB } from "./utils";
import { ArticleTrackMap, ArticleInfo, ArticleTrack } from "../types";
import Nedb = require("nedb");
import { getUserLikedArticleIds, getUserLikedTrackIds } from "../user";

const articleDB: Nedb = getDB("article");
const articleTrackMapDB: Nedb = getDB("article_track_map");

function saveArticleTrackMap(map: ArticleTrackMap): Promise<ArticleTrackMap> {
  return insert<ArticleTrackMap>(articleTrackMapDB, map);
}

function saveArticleTracksMap(
  article: ArticleInfo
): Promise<ArticleTrackMap[]> {
  const { tracks } = article;
  const maps: ArticleTrackMap[] = tracks.map(
    track => ({ id: track.id, articleId: article.id } as ArticleTrackMap)
  );
  return Promise.all(maps.map(map => saveArticleTrackMap(map)));
}

async function saveArticle(article: ArticleInfo): Promise<ArticleInfo> {
  if (await isExist(articleDB, { id: article.id })) {
    throw new Error(`Article ${article.id} ${article.title} exists`);
  }

  console.log(`Save article: id-${article.id}, title-${article.title}`);
  await saveArticleTracksMap(article);
  return insert<ArticleInfo>(articleDB, article);
}

function saveArticles(articles: ArticleInfo[]): Promise<ArticleInfo[]> {
  return Promise.all(articles.map(article => saveArticle(article)));
}

function getArticles(): Promise<ArticleInfo[]> {
  return find<ArticleInfo>(articleDB, {}, { id: -1 });
}

async function getLatestArticle(): Promise<ArticleInfo> {
  const articles = await find<ArticleInfo>(articleDB, {}, { id: -1 }, 1);
  return articles[0];
}

function getLikedArticles(): Promise<ArticleInfo[]> {
  const ids = getUserLikedArticleIds();
  return getArticleByIds(ids);
}

function getLikedArticleTracks(): Promise<ArticleTrack[]> {
  const ids = getUserLikedTrackIds();
  return getArticleTrackByIds(ids);
}

async function getArticleByTrackId(
  trackId: number
): Promise<Maybe<ArticleInfo>> {
  const map = await findOne<ArticleTrackMap>(articleTrackMapDB, {
    id: trackId
  });
  if (!map) {
    return null;
  }
  return findOne<ArticleInfo>(articleDB, { id: map.articleId });
}

async function getArticleTrackByIds(
  trackIds: number[]
): Promise<ArticleTrack[]> {
  const iMaps = await find<ArticleTrackMap>(
    articleTrackMapDB,
    { id: { $in: trackIds } },
    { vol: -1 }
  );
  const maps = iMaps.reduce((accu, i) => {
    const { id, articleId } = i;
    if (accu[articleId]) {
      accu[articleId].push(id);
    } else {
      accu[articleId] = [id];
    }
    return accu;
  }, {});
  const articles: ArticleInfo[] = await getArticleByIds(
    Object.keys(maps).map(i => parseInt(i, 10))
  );
  return articles.reduce(
    (accu, i) => {
      const { id: articleId, tracks: articleTracks } = i;
      const trackIds = maps[articleId];
      const tracks = articleTracks.filter(i => trackIds.includes(i.id));
      return [...accu, ...tracks];
    },
    [] as ArticleTrack[]
  );
}

function getArticleByIds(ids: number[]): Promise<ArticleInfo[]> {
  return find(articleDB, { id: { $in: ids } }, { id: -1 });
}

export {
  saveArticle,
  saveArticles,
  getArticles,
  getLikedArticles,
  getLikedArticleTracks,
  getLatestArticle,
  getArticleByIds,
  getArticleByTrackId,
  getArticleTrackByIds
};
