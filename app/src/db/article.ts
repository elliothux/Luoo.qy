import {
  getDB,
  count as countDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB
} from "./operations";
import {insert as insertTracks} from "./article-track";
import { FindOptions, ArticleInfo, ArticleTrack } from "../types";

const db: Nedb = getDB("article");

function count(query?: object): Promise<number> {
  return countDB(db, query);
}

function findOne<T = ArticleInfo>(query: object): Promise<Maybe<T>> {
  return findOneDB<T>(db, query);
}

function find<T = ArticleInfo>(options: FindOptions): Promise<T[]> {
  return findDB({
    db: db,
    ...options
  });
}

async function insert(items: ArticleInfo[]): Promise<ArticleInfo[]> {
  const tracks: ArticleTrack[] = [];
  for (let item of items) {
    tracks.push(...item.tracks);
    delete item.tracks;
  }
  await insertTracks(tracks);
  return insertDB<ArticleInfo>(db, items);
}

export { count, findOne, find, insert };
