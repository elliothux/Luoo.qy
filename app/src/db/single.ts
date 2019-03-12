import {
  getDB,
  find as findDB,
  findOne as findOneDB,
  insert as insertDB,
  count as countDB
} from "./operations";
import { FindOptions, Single } from "../types";

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

function insert(items: Single[]): Promise<Single[]> {
  return insertDB<Single>(db, items);
}

export { count, find, findOne, insert };
