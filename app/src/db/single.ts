import { app } from "electron";
import { insert, find, isExist, getDB, findOne } from "./utils";
import { Single } from "../types";
import Nedb = require("nedb");
import { getUserLikedTrackIds } from "../user";

const singleDB: Nedb = getDB("single");

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
  return find<Single>(singleDB, {}, {},{ date: -1 });
}

function getLikedSingles(): Promise<Single[]> {
  const ids = getUserLikedTrackIds();
  return getSingleByIds(ids);
}

async function getLatestSingle(): Promise<Single> {
  const singles = await find<Single>(singleDB, {},{}, { date: -1 }, 1);
  return singles[0];
}

function getSingleById(id: number): Promise<Maybe<Single>> {
  return findOne<Single>(singleDB, { id });
}

function getSingleByIds(ids: number[]): Promise<Single[]> {
  return find(singleDB, { id: { $in: ids } }, {},{ date: -1 });
}

export {
  saveSingle,
  saveSingles,
  getSingles,
  getLatestSingle,
  getLikedSingles,
  getSingleById,
  getSingleByIds
};
