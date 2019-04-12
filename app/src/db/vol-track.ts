import {
  getDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB, whereOfTrack
} from "./operations";
import { FindOptions, VolTrack } from "../types";

const db: Nedb = getDB("vol-track");

function find<T = VolTrack>(options: FindOptions): Promise<T[]> {
  return findDB({
    db: db,
    ...options
  });
}

function findOne(query: object): Promise<Maybe<VolTrack>> {
  return findOneDB<VolTrack>(db, query);
}

function insert(items: VolTrack[]): Promise<VolTrack[]> {
  return insertDB<VolTrack>(db, items);
}

function search<T = VolTrack>(
    text: string,
    projection: object
): Promise<T[]> {
  return find({
    query: { $where: () => whereOfTrack(this, text) },
    projection
  } as FindOptions);
}

export { find, findOne, insert, search };
