const request = require('request');
const db = require('./db');


module.exports.getVolList = getVolList;
module.exports.getTrackList = getTrackList;


///////////////// VOL API ///////////////

// 获取 Vol 列表
function getVolList() {
    return getData('http://127.0.0.1:5000/api/latestVol').then(data => {
        const latestVol = parseInt(data);
        return db.isVolExist(latestVol).then(exist => {
            if (!exist)
                getVolFromServer(latestVol);
            return db.getVolList();
        })
    })
}


// 从服务器获取 Vol
function getVolFromServer(index) {
    if ([544, 566, 567, 568].indexOf(index) !== -1)
        return getVolFromServer(index-1);
    getData('http://127.0.0.1:5000/api/vol/' + index).then(data => {
        data = JSON.parse(data);
        // 将 Vol 数据添加到数据库
        db.addVol(data).then(success => {
            // 添加成功, 继续获取下一个 Vol 数据
            if (success && index>0)
                return getVolFromServer(index-1);
        })
    })
}


///////////////// TRACK API ///////////////

// 获取 Track 列表
function getTrackList(index) {
    return db.isTrackExist(index).then(exist => {
        if (!exist)
            getTrackFromServer(index);
        return db.getTrackList(index);
    })
}

// 从服务器获取 Track
function getTrackFromServer(index) {
    if ([544, 566, 567, 568].indexOf(index) !== -1)
        return getTrackFromServer(index-1);
    getData('http://127.0.0.1:5000/api/track/' + index).then(trackData => {
        const data = {
            vol: index,
            data: JSON.parse(trackData),
            length: JSON.parse(trackData).length
        };
        // 将 Track 数据添加到数据库
        db.addTrackList(data).then(success => {
            // 添加成功, 继续获取下一个 Track 数据
            if (success && index>0)
                return getTrackFromServer(index-1);
        })
    })
}


///////////////// Other functions /////////////////

function getData(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200)
                resolve(body);
            else if (error)
                reject(error)
        })
    })
}