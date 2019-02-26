import * as path from "path";
import DataStore, { DataStoreOptions } from "nedb";
import { insert, find, isExist, findOne } from "./utils";
import { ArticleInfo, ArticleTrack } from "../types";

const articleDB: DataStore = new DataStore({
  filename: path.join(__dirname, "../../static/db/article"),
  autoload: true
} as DataStoreOptions);

const articleTrackDB: DataStore = new DataStore({
  filename: path.join(__dirname, "../../static/db/article_track"),
  autoload: true
} as DataStoreOptions);

function saveArticleTrack(articleTrack: ArticleTrack): Promise<ArticleTrack> {
  return insert<ArticleTrack>(articleTrackDB, articleTrack);
}

async function saveArticle(article: ArticleInfo): Promise<ArticleInfo> {
  const { tracks } = article;
  delete article.tracks;

  if (await isExist(articleDB, { id: article.id })) {
    throw new Error(`Article ${article.id} ${article.title} exists`);
  }

  await Promise.all(tracks.map(track => saveArticleTrack(track)));
  return insert<ArticleInfo>(articleDB, article);
}

function saveArticles(articles: ArticleInfo[]): Promise<ArticleInfo[]> {
  return Promise.all(articles.map(article => saveArticle(article)));
}

function getArticleTracks(articleId: number): Promise<ArticleTrack[]> {
  return find<ArticleTrack>(articleDB, { articleId });
}

async function getArticles(): Promise<ArticleInfo[]> {
  const articles = await find<ArticleInfo>(articleDB, {}, { id: -1 });
  return Promise.all(
    articles.map(async article => {
      article.tracks = await getArticleTracks(article.id);
      return article;
    })
  );
}

async function getLatestArticle(): Promise<ArticleInfo> {
  const articles = await find<ArticleInfo>(articleDB, {}, { id: -1 }, 1);
  return articles[0];
}

async function getArticleFromTrack(
  trackId: number
): Promise<ArticleInfo | null> {
  const track = await findOne<ArticleTrack>(articleTrackDB, { id: trackId });
  if (track) {
    return findOne(articleDB, { id: track.articleId });
  }
  return null;
}

export {
  saveArticle,
  saveArticles,
  getArticles,
  getLatestArticle,
  getArticleFromTrack
};
