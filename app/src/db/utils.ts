import * as path from "path";
import { app } from "electron";
import { DataStoreOptions } from "nedb";
import { isDev, runPath } from "../utils";
import Nedb = require("nedb");

function getDB(name: string): Nedb {
  return new Nedb({
    filename: path.resolve(
      runPath,
      isDev ? `./dist/db/${name}` : `./dist/db/${name}`
    ),
    autoload: true
  } as DataStoreOptions);
}

function insert<T>(db: Nedb, data: T): Promise<T> {
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
      resolve(doc as T);
    });
  });
}

function find<T>(
  db: Nedb,
  query: object = {},
  sort?: object,
  limit?: number
): Promise<T[]> {
  let exec = db.find(query);

  if (sort) {
    exec = exec.sort(sort);
  }

  if (limit) {
    exec = exec.limit(limit);
  }

  return new Promise((resolve, reject) => {
    exec.exec((error, docs) => {
      if (error) {
        return reject(
          `An error happened whiling handling find: ${query} - ${error}`
        );
      }
      resolve(docs as T[]);
    });
  });
}

function findOne<T>(db: Nedb, query: object): Promise<T | null> {
  return new Promise((resolve, reject) => {
    db.findOne(query, (error, doc) => {
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

export { getDB, insert, find, findOne, isExist };
