const DataStore = require('nedb');
const path = require('path');
const colors = require('colors');
const config = require('./config');


module.exports = {
    vol: {
        add: addVol,
        get: getVolList,
        getLiked: getLikedVolList,
        latest: getLatestVol,
        isExist: async volIndex => await isExist({ vol: volIndex }, vol),
    },
    track: {
        add: addVolTrack,
        get: getVolTrackList,
        getLiked: getLikedVolTrackList,
        isExist: async track_id => await isExist({ track_id: track_id }, volTrack)
    },
    single: {
        add: addSingle,
        get: getSingleList,
        getLiked: getLikedSingleList,
        latest: getLatestSingle,
        isExist: async date => await isExist({ date: date }, single),
    }
};


const vol = new DataStore({
    filename: path.join(__dirname, '../../db/vol'),
    autoload: true
});
const volTrack = new DataStore({
    filename: path.join(__dirname, '../../db/volTracks'),
    autoload: true
});
const single = new DataStore({
    filename: path.join(__dirname, '../../db/single'),
    autoload: true
});


async function addVol(data) {
    if (await isExist({ vol: data.vol }, vol))
        throw new Error(`Add vol failed for vol${data.vol} already existing`);

    const newDoc = await _insert(data, vol);
    console.log(`Add success: vol${data.vol}`.green);
    return newDoc;
}


async function getVolList() {
    return await _find({}, vol, {vol: -1})
}


async function getLatestVol() {
    return (await _find({}, vol, {vol: -1}))[0].vol
}


async function getLikedVolList() {
    return await _find({vol: {$in: config.get('likedVols')}}, vol, {vol: -1})
}


async function addVolTrack(data) {
    if (await isExist({ track_id: data.track_id }, volTrack))
        throw new Error(`Add vol failed for track${data.track_id} already existing`);

    const newDoc = await _insert(data, volTrack);
    console.log(`Add success: volTrack${data.track_id}`.green);
    return newDoc;
}


async function getVolTrackList() {
    return await _find({}, volTrack, {track_id: -1})
}


async function getLikedVolTrackList() {
    return await _find({track_id: {$in: config.get('likedTracks')}}, volTrack, {track_id: -1})
}


async function addSingle(data) {
    if (await isExist({ date: data.date }, single))
        throw new Error(`Add single failed for single${data.date} already exist`);

    const newDoc = await _insert(data, single);
    console.log(`Add success: single${data.date}`.green);
    return newDoc;
}


async function getSingleList() {
    return await _find({}, single, {date: -1})
}


async function getLatestSingle() {
    return (await _find({}, single, {date: -1}))[0].date
}


async function getLikedSingleList() {
    return await _find({ single_id: { $in: config.get('likedTracks') }}, single, {date: -1})
}




async function isExist(arg, db) {
    const doc = await _find(arg, db);
    return doc.length > 0;
}


async function remove(arg, db) {
    if (!await isExist(arg, db)) return;
    await _remove(arg, db);
    console.log(`Delete success: ${arg}`.red);
}


function _insert(arg, db) {
    if (!arg || typeof arg !== 'object')
        throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
    return new Promise((resolve, reject) => {
        db.insert(arg, (error, doc) => {
            error && reject(`An error happened whiling handling insert: ${error}`);
            resolve(doc);
        })
    })
}


function _find(arg, db, sort, limit) {
    (!arg || typeof arg !== 'object') && (arg = {});
    return new Promise((resolve, reject) => {
        let exec = db.find(arg);
        sort && (exec = exec.sort(sort));
        limit && (exec = exec.limit(limit));
        exec.exec(function (error, docs) {
            error && reject(`An error happened whiling handling find: ${error}`);
            resolve(docs);
        })
    })
}


function _update(arg, newArg, db) {
    (!arg || typeof arg !== 'object') && (arg = {});
    return new Promise((resolve, reject) => {
        db.update(arg, {$set: newArg}, {}, function (error, numReplaced) {
            error && reject(`An error happened whiling handling find: ${error}`);
            resolve(numReplaced);
        })
    })
}


function _remove(arg, db) {
    if (!arg || typeof arg !== 'object')
        throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
    return new Promise((resolve, reject) => {
        db.remove(arg, {}, function (error) {
            error && reject(`An error happened while handling remove: ${error}`);
            resolve()
        })
    })
}
