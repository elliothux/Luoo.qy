import {
  getDB,
  count as countDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB
} from "./operations";
import { insert as insertTracks } from "./vol-track";
import { FindOptions, VolInfo, VolTrack } from "../types";

const db: Nedb = getDB("vol");

function count(query?: object): Promise<number> {
  return countDB(db, query);
}

function findOne<T = VolInfo>(query: object): Promise<Maybe<T>> {
  return findOneDB<T>(db, query);
}

function find<T = VolInfo>(options: FindOptions): Promise<T[]> {
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

async function insert(items: VolInfo[]): Promise<VolInfo[]> {
  const tracks: VolTrack[] = [];
  for (let item of items) {
    tracks.push(...item.tracks);
    delete item.tracks;
  }
  await insertTracks(tracks);
  return insertDB<VolInfo>(db, items);
}

function search<T = VolInfo>(text: string, projection: object): Promise<T[]> {
  return find({
    query: {
      $where: function () {
        const item = this as VolInfo;
        const reg = new RegExp(text.trim());
        if (reg.test(item.title) || reg.test(item.desc)) {
          return true;
        }
        for (let tag of item.tags) {
          if (reg.test(tag)) {
            return true;
          }
        }
        return false;
      }
    },
    projection
  } as FindOptions);
}

export { count, findOne, find, insert, latestID, search };
