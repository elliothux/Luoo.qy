import {
  getDB,
  count as countDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB
} from "./operations";
import { insert as insertTracks } from "./article-track";
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

async function latestID(): Promise<number> {
  const [latest] = await find({
    sort: { id: -1 },
    limit: 1
  });
  return latest ? latest.id : 0;
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

function search<T = ArticleInfo>(
  text: string,
  projection: object
): Promise<T[]> {
  return find({
    query: {
      $where: function() {
        const item = this as ArticleInfo;
        const reg = new RegExp(text.trim());
        return (
          reg.test(item.title) ||
          reg.test(item.intro) ||
          reg.test(item.metaInfo) ||
          reg.test(item.desc) ||
          reg.test(item.author)
        );
      }
    },
    projection
  } as FindOptions);
}

export { count, findOne, find, insert, latestID, search };
