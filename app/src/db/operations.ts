import * as path from "path";
import { DataStoreOptions } from "nedb";
import { isElectron, runPath } from "../utils";
import Nedb = require("nedb");
import {ArticleTrack, FindOptions, Track} from "../types";

function getDB(name: string): Nedb {
  const db = new Nedb({
    filename: isElectron
      ? path.resolve(runPath, `./dist/db/${name}`)
      : path.resolve(__dirname, `../../static/db/${name}`),
    autoload: true
  } as DataStoreOptions);
  setTimeout(() => {
    db.ensureIndex({ fieldName: "id" }, function(error) {
      if (error) {
        console.error(`Create index error:`, error);
      }
    });
  }, 0);
  return db;
}

function insert<T>(db: Nedb, data: T[]): Promise<T[]> {
  if (!data || typeof data !== "object") {
    throw new Error(
      `Function 'insert' except an object not ${typeof data} as the first argument.`
    );
  }

  return new Promise((resolve, reject) => {
    db.insert(data, (error, doc) => {
      if (error) {
        return reject(`An error happened whiling handling insert: ${error}`);
      }
      console.log(`Insert one document: ${JSON.stringify(data).slice(0, 30)}`);
      resolve(doc as T[]);
    });
  });
}

function count(db: Nedb, query?: object): Promise<number> {
  return new Promise((resolve, reject) => {
    db.count(query, function(error, count) {
      if (error) {
        return reject(
          `An error happened whiling handling count: ${query} - ${error}`
        );
      }
      return resolve(count);
    });
  });
}

interface DBFindOptions extends FindOptions {
  db: Nedb;
}

function find<T>(options: DBFindOptions): Promise<T[]> {
  const { db, query, projection, skip, limit, sort } = options;
  let cursor = db.find<T>(query);

  if (projection) {
    cursor = cursor.projection(projection);
  }
  if (skip) {
    cursor = cursor.skip(skip);
  }
  if (limit) {
    cursor = cursor.limit(limit);
  }
  if (sort) {
    cursor = cursor.sort(sort);
  }

  return new Promise((resolve, reject) => {
    cursor.exec((error, docs) => {
      if (error) {
        return reject(
          `An error happened whiling handling find: ${query} - ${error}`
        );
      }
      return resolve(docs as T[]);
    });
  });
}

function findOne<T>(db: Nedb, query: object): Promise<Maybe<T>> {
  return new Promise((resolve, reject) => {
    db.findOne<T>(query, (error, doc) => {
      if (error) {
        return reject(
          `An error happened whiling handling findOne: ${query} - ${error}`
        );
      }
      if (doc) {
        resolve(doc as T);
      } else {
        resolve(null);
      }
    });
  });
}

async function isExist(db: Nedb, query: object): Promise<boolean> {
  const doc = await findOne(db, query);
  return doc !== null;
}

function whereOfTrack<T extends Track>(item: T, text: string) {
  const reg = new RegExp(text.trim());
  return (
      reg.test(item.name) || reg.test(item.artist) || reg.test(item.album)
  );
}

export { getDB, insert, count, find, findOne, isExist, whereOfTrack };
