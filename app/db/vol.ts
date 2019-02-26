import * as path from "path";
import Nedb = require("nedb");
import { DataStoreOptions } from "nedb";
import { VolInfo, VolTrack } from "../types";
import { insert, find, isExist, findOne } from "./utils";


const volDB: Nedb = new Nedb({
  filename: path.join(__dirname, "../../static/db/vol"),
  autoload: true
} as DataStoreOptions);

const volTrackDB: Nedb = new Nedb({
  filename: path.join(__dirname, "../../static/db/vol_track"),
  autoload: true
} as DataStoreOptions);


function saveVolTrack(volTrack: VolTrack): Promise<VolTrack> {
  console.log(`Save vol track: id-${volTrack.id}, name-${volTrack.name}`);
  return insert<VolTrack>(volTrackDB, volTrack);
}

async function saveVol(vol: VolInfo): Promise<VolInfo> {
  const { tracks } = vol;
  delete vol.tracks;

  if (await isExist(volDB, { id: vol.id })) {
    throw new Error(`Vol ${vol.vol} ${vol.title} exists`);
  }

  await Promise.all(tracks.map(track => saveVolTrack(track)));
  console.log(`Save vol: vol-${vol.vol}, title-${vol.title}`);
  return insert<VolInfo>(volDB, vol);
}

function saveVols(vols: VolInfo[]): Promise<VolInfo[]> {
  return Promise.all(vols.map(vol => saveVol(vol)));
}

function getVolTracks(vol: number): Promise<VolTrack[]> {
  return find<VolTrack>(volTrackDB, { vol });
}

async function getVols(): Promise<VolInfo[]> {
  const vols = await find<VolInfo>(volDB, {}, { vol: -1 });
  return Promise.all(
    vols.map(async vol => {
      vol.tracks = await getVolTracks(vol.vol);
      return vol;
    })
  );
}

async function getLatestVol(): Promise<VolInfo> {
  const vols = await find<VolInfo>(volDB, {}, { vol: -1 }, 1);
  return vols[0];
}

async function getVolFromTrack(trackId: number): Promise<VolInfo | null> {
  const track = await findOne<VolTrack>(volTrackDB, { id: trackId });
  if (track) {
    return findOne(volDB, { id: track.id });
  }
  return null;
}

export { saveVol, saveVols, getVols, getLatestVol, getVolFromTrack };
