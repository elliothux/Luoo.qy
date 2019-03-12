import {
  getDB,
  count as countDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB
} from "./operations";
import { insert as insertTracks } from "./vol-tracks";
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

async function insert(items: VolInfo[]): Promise<VolInfo[]> {
  const tracks: VolTrack[] = [];
  for (let item of items) {
    tracks.push(...item.tracks);
    delete item.tracks;
  }
  await insertTracks(tracks);
  return insertDB<VolInfo>(db, items);
}

export { count, findOne, find, insert };
