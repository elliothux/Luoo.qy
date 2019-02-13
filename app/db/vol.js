const DataStore = require('nedb');
const path = require('path');
const { isExist, _insert, _find } = require('./utils');


const vol = new DataStore({
  filename: path.join(__dirname, '../../db/vol'),
  autoload: true,
});

const volTrack = new DataStore({
  filename: path.join(__dirname, '../../db/vol_track'),
  autoload: true,
});

async function addVol(data) {
  if (await isExist({ id: data.id }, vol)) {
    throw new Error(`Add vol failed for vol${data.vol} already existing`);
  }

  const newDoc = await _insert(data, vol);
  console.log(`Add success: vol${data.vol}`.green);
  return newDoc;
}

async function getVolList(volIndex) {
  const options = volIndex ? { vol: volIndex } : {};
  const result = await _find(options, vol, { vol: -1 });
  return volIndex ? result[0] : result;
}

async function getLatestVol() {
  const vols = await _find({}, vol, { vol: -1 });
  return vols.length > 0 ? vols[0].vol : 0;
}

async function addVolTrack(data) {
  if (await isExist({ vol: data.vol, track_id: data.track_id }, volTrack)) {
    throw new Error(
      `Add vol failed for track${data.track_id} already existing`,
    );
  }

  const newDoc = await _insert(data, volTrack);
  console.log(`Add success: volTrack${data.track_id}`.green);
  return newDoc;
}

async function getVolTrackList() {
  return await _find({}, volTrack, { track_id: -1 });
}


module.exports = {
  vol: {
    add: addVol,
    get: getVolList,
    latest: getLatestVol,
    isExist: async volIndex => await isExist({ vol: volIndex }, vol),
  },
  volTrack: {
    add: addVolTrack,
    get: getVolTrackList,
    isExist: async track_id => await isExist({ track_id }, volTrack),
  },
};
