import {
  getDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB,
  count as countDB, whereOfTrack
} from "./operations";
import {FindOptions, Single} from "../types";

const db: Nedb = getDB("single");

function count(query?: object): Promise<number> {
  return countDB(db, query);
}

function find<T = Single>(options: FindOptions): Promise<T[]> {
  return findDB({
    db: db,
    ...options
  });
}

function findOne(query: object): Promise<Maybe<Single>> {
  return findOneDB<Single>(db, query);
}

async function latestID(): Promise<number> {
  const [latest] = await find({
    sort: { id: -1 },
    limit: 1
  });
  return latest ? latest.id : 0;
}

function insert(items: Single[]): Promise<Single[]> {
  return insertDB<Single>(db, items);
}

function search<T = Single>(
    text: string,
    projection: object
): Promise<T[]> {
  return find({
    query: { $where: () => whereOfTrack(this, text) },
    projection
  } as FindOptions);
}

export { count, find, findOne, insert, latestID, search };
