import * as path from "path";
import Nedb = require("nedb");
import { DataStoreOptions } from "nedb";
import { insert, find, isExist } from "./utils";
import { Single } from "../types";

const singleDB: Nedb = new Nedb({
  filename: path.join(__dirname, "../../static/db/single"),
  autoload: true
} as DataStoreOptions);

async function saveSingle(single: Single): Promise<Single> {
  if (await isExist(singleDB, { id: single.id })) {
    throw new Error(`Single ${single.id} ${single.name} exists`);
  }

  console.log(`Save single: id-${single.id}, name-${single.name}`);
  return insert<Single>(singleDB, single);
}

function saveSingles(singles: Single[]): Promise<Single[]> {
  return Promise.all(singles.map(single => saveSingle(single)));
}

function getSingles(): Promise<Single[]> {
  return find<Single>(singleDB, {}, { date: -1 });
}

async function getLatestSingle(): Promise<Single> {
  const singles = await find<Single>(singleDB, {}, { date: -1 }, 1);
  return singles[0];
}

export { saveSingle, saveSingles, getSingles, getLatestSingle };
