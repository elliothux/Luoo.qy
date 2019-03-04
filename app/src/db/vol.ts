import { insert, find, isExist, findOne, getDB } from "./utils";
import { VolInfo, VolTrack, VolTrackMap } from "../types";
import Nedb = require("nedb");
import {
  getUserCollections,
  getUserLikedTrackIds,
  getUserLikedVolIds
} from "../user";

const volDB: Nedb = getDB("vol");

const volTrackMapDB: Nedb = getDB("vol_track_map");

function saveVolTrackMap(map: VolTrackMap): Promise<VolTrackMap> {
  return insert<VolTrackMap>(volTrackMapDB, map);
}

function saveVolTracksMap(vol: VolInfo): Promise<VolTrackMap[]> {
  const { tracks } = vol;
  const maps: VolTrackMap[] = tracks.map(
    track => ({ id: track.id, vol: track.vol, volId: vol.id } as VolTrackMap)
  );
  return Promise.all(maps.map((map: VolTrackMap) => saveVolTrackMap(map)));
}

async function saveVol(vol: VolInfo): Promise<VolInfo> {
  if (await isExist(volDB, { id: vol.id })) {
    throw new Error(`Vol ${vol.vol} ${vol.title} exists`);
  }

  console.log(`Save vol: vol-${vol.vol}, title-${vol.title}`);
  await saveVolTracksMap(vol);
  return insert<VolInfo>(volDB, vol);
}

function saveVols(vols: VolInfo[]): Promise<VolInfo[]> {
  return Promise.all(vols.map(vol => saveVol(vol)));
}

async function getLatestVol(): Promise<VolInfo> {
  const vols = await find<VolInfo>(volDB, {}, { vol: -1 }, 1);
  return vols[0];
}

function getVols(): Promise<VolInfo[]> {
  return find<VolInfo>(volDB, {}, { vol: -1 });
}

function getLikedVols(): Promise<VolInfo[]> {
  const ids = getUserLikedVolIds();
  return getVolByIds(ids);
}

function getLikedVolTracks(): Promise<VolTrack[]> {
  const ids = getUserLikedTrackIds();
  return getVolTrackByIds(ids);
}

async function getVolTrackByIds(trackIds: number[]): Promise<VolTrack[]> {
  const iMaps = await find<VolTrackMap>(
    volTrackMapDB,
    { id: { $in: trackIds } },
    { vol: -1 }
  );
  const maps = iMaps.reduce((accu, i) => {
    const { id, volId } = i;
    if (accu[volId]) {
      accu[volId].push(id);
    } else {
      accu[volId] = [id];
    }
    return accu;
  }, {});
  const vols: VolInfo[] = await getVolByIds(
    Object.keys(maps).map(i => parseInt(i, 10))
  );
  return vols.reduce(
    (accu, i) => {
      const { id: volId, tracks: volTracks } = i;
      const trackIds = maps[volId];
      const tracks = volTracks.filter(i => trackIds.includes(i.id));
      return [...accu, ...tracks];
    },
    [] as VolTrack[]
  );
}

async function getVolByTrackId(trackId: number): Promise<Maybe<VolInfo>> {
  const map = await findOne<VolTrackMap>(volTrackMapDB, { id: trackId });
  if (!map) {
    return null;
  }
  return findOne<VolInfo>(volDB, { id: map.volId });
}

function getVolById(id: number): Promise<Maybe<VolInfo>> {
  return findOne<VolInfo>(volDB, { id });
}

function getVolByIds(ids: number[]): Promise<VolInfo[]> {
  return find(volDB, { id: { $in: ids } }, { vol: -1 });
}

export {
  saveVol,
  saveVols,
  getVols,
  getLikedVols,
  getLikedVolTracks,
  getLatestVol,
  getVolByTrackId,
  getVolById,
  getVolByIds,
  getVolTrackByIds
};
