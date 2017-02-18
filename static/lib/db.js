const volLevel = require( 'levelup' )('./db/vol', {valueEncoding: 'json'});
const trackLevel = require('levelup')('./db/track');
const volDB = require('level-promisify')(volLevel);
const trackDB = require('level-promisify')(trackLevel);


module.exports.addVol = addVol;
module.exports.getVolList = getVolList;
module.exports.addTrack = addTrack;
module.exports.getTrackList = getTrackList;
module.exports.isExist = isExist;
module.exports._deleteVol = _deleteVol;


// 添加 Vol
function addVol(vol) {
    vol = parseInt(vol);
    return isExist(vol.vol).then((exist) => {
        // 添加成功
        if (!exist)
            return volDB.put(vol.vol, vol).then(() => {
                console.log(`Add success: Vol${vol.vol}`);
                return true
            });
        // 添加失败
        else
            console.log(`Failed to add: Vol${vol.vol} exist`);
            return new Promise((resolve, reject) => {
                resolve(false)
            })
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
                resolve(list);
            })
    })
}

// 传入 Vol, 将其删除
function _deleteVol(vol) {
    vol = parseInt(vol);
    return isExist(vol).then(exist => {
        if (exist)
            return volDB.del(vol).then(() => {
                console.log(`Delete Vol${vol} success!`);
                return true
            });
        return new Promise((resolve, reject) => {
            console.log(`Delete Vol${vol} failed cause it's not exist!`);
            resolve(false)
        })
    })
}

// 传入 Vol 判断是否存在 Vol
function isExist(vol) {
    return volDB.get(vol).then(() => {
        return true
    }).catch(() => {
        return false
    })
}


// 添加 Track
function addTrack(trackList) {
    return trackDB.get(trackList.vol).then((data) => {
        console.log(`Failed to add: TrackList${trackList.vol} exist`);
        return false
    }).catch(() => {
        return trackDB.put(trackList.vol, trackList).then(() => {
            console.log(`Add success: Tracks${trackList.vol}`);
            return true
        })
    })
}

// 传入 vol 数目, 获取 Track 列表
function getTrackList(vol) {
    return trackDB.get(vol).then(data => {
        return data
    }).catch(error => {
        return { error: error }
    })
}
