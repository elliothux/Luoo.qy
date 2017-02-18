const request = require('request');
const db = require('./db');


module.exports.getVolList = getVolList;
module.exports.getData = getData;

// 获取 Vol 列表
function getVolList() {
    return getData('http://127.0.0.1:5000/api/latestVol').then(data => {
        const latestVol = parseInt(data);
        db.isExist(latestVol).then(exist => {
            if (!exist)
                getVolFromServer(latestVol);
            return db.getVolList();
        })
    })
}


// 从服务器获取 Vol
function getVolFromServer(index) {
    console.log(`index: ${index}`);
    getData('http://127.0.0.1:5000/api/vol/' + index).then(data => {
        data = JSON.parse(data);
        console.log('data:')
        console.log(data);
        // 将 Vol 数据添加到数据库
        db.addVol(data).then(success => {
            // 添加成功, 继续获取下一个 Vol 数据
            if (success && index>0)
                getVolFromServer(index--);
        })
    })
}


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