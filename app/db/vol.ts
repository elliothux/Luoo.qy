import * as path from "path";
import DataStore, { DataStoreOptions } from "nedb";
import { VolInfo, VolTrack } from "../types";
import {insert, find, isExist, findOne} from "./utils";


const volDB: DataStore = new DataStore({
  filename: path.join(__dirname, "../../static/db/vol"),
  autoload: true
} as DataStoreOptions);

const volTrackDB: DataStore = new DataStore({
  filename: path.join(__dirname, "../../static/db/vol_track"),
  autoload: true
} as DataStoreOptions);


function saveVols(vols: VolInfo[]): Promise<VolInfo[]> {
  return Promise.all(vols.map(async (vol: VolInfo) => saveVol(vol)));
}

async function saveVol(vol: VolInfo): Promise<VolInfo> {
  const { tracks } = vol;
  delete vol.tracks;

  if (isExist(volDB, { id: vol.id })) {
    throw new Error(`Vol ${vol.vol} ${vol.title} exists`);
  }

  await Promise.all(tracks.map(track => saveVolTrack(track)));
  return insert<VolInfo>(volDB, vol);
}

function saveVolTrack(volTrack: VolTrack): Promise<VolTrack> {
  return insert(volTrackDB, volTrack);
}

async function getVols(): Promise<VolInfo[]> {
  const vols = await find<VolInfo>(volDB);
  return Promise.all(
      vols.map(async vol => {
        vol.tracks = await getVolTracks(vol.vol);
        return vol;
      })
  );
}

async function getVolTracks(vol: number): Promise<VolTrack[]> {
  return find<VolTrack>(volTrackDB, { vol });
}

async function getVolFromTrack(trackId: number): Promise<VolInfo | null> {
  const track = await findOne<VolTrack>(volTrackDB, { id: trackId });
  if (track) {
    return findOne(volDB, { id: track.id })
  }
  return null;
}

export {
  saveVol,
  saveVols,
  getVols,
  getVolFromTrack
}
