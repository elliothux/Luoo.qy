const volLevel = require( 'levelup' )('./db/vol', {valueEncoding: 'json'});
const trackLevel = require('levelup')('./db/track', {valueEncoding: 'json'});
const volDB = require('level-promisify')(volLevel);
const trackDB = require('level-promisify')(trackLevel);


module.exports.addVol = addVol;
module.exports.getVolList = getVolList;
module.exports.addTrackList = addTrackList;
module.exports.getTrackList = getTrackList;
module.exports.isVolExist = isVolExist;
module.exports.isTrackExist = isTrackExist;
module.exports._deleteVol = _deleteVol;
module.exports._deleteTrack = _deleteTrack;

///////////////// VOL API ///////////////

// 添加 Vol
function addVol(vol) {
    return isVolExist(vol.vol).then((exist) => {
        // 添加成功
        if (!exist)
            return volDB.put(vol.vol, vol).then(() => {
                console.log(`Add success: Vol${vol.vol}`);
                return true
            });
        // 添加失败
        else {
            console.log(`Failed to add: Vol${vol.vol} exist`);
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        }
    })
}

// 获取 Vol 列表
function getVolList() {
    return new Promise((resolve, reject) => {
        const list = [];
        volLevel.createReadStream()
            .on('data', function (data) {
                list.push(data.value);
            })
            .on('error', function (err) {
                reject(`Oh my! ${err}`)
            })
            .on('close', function () {})
            .on('end', function () {
                resolve(list.sort(sortVolList));
            })
    })
}

function sortVolList(a, b) {
    return parseInt(b.vol) - parseInt(a.vol)
}

// 传入 Vol 数目, 将其 Vol 删除
function _deleteVol(vol) {
    vol = parseInt(vol);
    return isVolExist(vol).then(exist => {
        if (exist)
            return volDB.del(vol).then(() => {
                console.log(`Delete Vol${vol} success!`);
                return true
            });
        return new Promise((resolve, reject) => {
            console.log(`Delete Vol${vol} failed cause it's not exist!`);
            reject(false)
        })
    })
}

// 传入 Vol 数目, 判断是否存在 Vol
function isVolExist(vol) {
    return volDB.get(vol).then(() => {
        return true
    }).catch(() => {
        return false
    })
}


///////////////// TRACK API ///////////////

// 添加 Track
function addTrackList(trackList) {
    return isTrackExist(trackList.vol).then((exist) => {
        // 添加成功
        if (!exist)
            return trackDB.put(trackList.vol, trackList).then(() => {
                console.log(`Add success: Track${trackList.vol}`);
                return true
            });
        // 添加失败
        else {
            console.log(`Failed to add: Track${trackList.vol} exist`);
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        }
    })
}

// 传入 Vol 数目, 获取 Track 列表
function getTrackList(vol) {
    return trackDB.get(vol).then(data => {
        return data
    }).catch(error => {
        return { error: error }
    })
}

// 传入 Vol 数目, 判断 trackList 是否存在
function isTrackExist(vol) {
    return trackDB.get(vol).then(() => {
        return true
    }).catch(() => {
        return false
    })
}

// 传入 Vol 数目, 将其 Track 删除
function _deleteTrack(vol) {
    vol = parseInt(vol);
    return isTrackExist(vol).then(exist => {
        if (exist)
            return trackDB.del(vol).then(() => {
                console.log(`Delete Track${vol} success!`);
                return true
            });
        return new Promise((resolve, reject) => {
            console.log(`Delete Track${vol} failed cause it's not exist!`);
            reject(false)
        })
    })
}