import * as path from "path";
import Nedb = require("nedb");
import { DataStoreOptions } from "nedb";
import { insert, find, isExist, findOne } from "./utils";
import { ArticleInfo, ArticleTrackMap } from "../types";

const articleDB: Nedb = new Nedb({
  filename: path.join(__dirname, "../../static/db/article"),
  autoload: true
} as DataStoreOptions);

const articleTrackMapDB: Nedb = new Nedb({
  filename: path.join(__dirname, "../../static/db/article_track_map"),
  autoload: true
} as DataStoreOptions);

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

async function getArticleFromTrackId(
  trackId: number
): Promise<ArticleInfo | null> {
  const map = await findOne<ArticleTrackMap>(articleTrackMapDB, {
    id: trackId
  });
  if (!map) {
    return null;
  }
  return findOne(articleDB, { id: map.articleId });
}

export {
  saveArticle,
  saveArticles,
  getArticles,
  getLatestArticle,
  getArticleFromTrackId
};
