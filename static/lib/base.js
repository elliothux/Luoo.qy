// 从服务器获取数据, 更新数据库等操作

const request = require('request-promise');
const db = require('./db');


module.exports.getData = getData;
module.exports.getVolList = getVolList;
module.exports.getSingleList = getSingleList;


// 服务器 IP
const IP = 'http://123.206.79.159:80';


///////////////// 实用函数 /////////////////


// 传入 URL, 以 GET 方法从服务器获取数据
async function getData(url) {
    return request(url)
        .then(data => {
            return data;
        })
        .catch(error => console.log(error))
}


///////////////// Vol Api /////////////////


// 以数组的形式从数据库获取并返回所有 vol 的数据, 并开始更新 vol
async function getVolList() {
    updateVolList();
    return await db.getVolList();
}


// 开始从服务器检测 vol 的数据是否有更新
async function updateVolList() {
    const url = `${IP}/api/latestVol`;
    // 获取最新一期的 vol 的编号
    const latestVol = parseInt(await getData(url));
    const exist = await db.isVolExist(latestVol);
    // 如果最新一期的 vol 已经存在于数据库, 直接返回
    if (exist) {
        return console.log(`All vol data updated at ${new Date()}.`)
    }
    // 否则开始从服务器获取数据
    else
        getVolFromServer(latestVol);
}


// 传入 vol 的编号, 开始从服务器获取 vol 的数据
async function getVolFromServer(index) {
    // vol 的编号必须大于 0
    if (index <= 0) return false;
    const exist = await db.isVolExist(index);
    // 如果该 vol 已经存在于数据库, 直接返回
    if (exist)
        return console.log(`All vol data updated at ${new Date()}.`);
    const url = `${IP}/api/vol/${index}`;
    // 否则从服务器获取该 vol 的数据
    let data = await getData(url);
    data = JSON.parse(data);

    // 如果该 vol 不存在, 服务器将会返回一个带有 'error' 的 JSON 数据
    if ('error' in data)
        // 这时直接跳过该 vol, 开始获取下一期 vol 的数据
        return getVolFromServer(index-1);

    // 解析 vol 中的 tracks 数据, 并根据其顺序由小到大进行排序
    data.tracks = JSON.parse(data.tracks).map(track => JSON.parse(track))
        .sort((a, b) => parseInt(a.order) - parseInt(b.order));
    db.addVol(data);

    // 该 vol 数据获取完毕, 开始获取下一期 vol
    await getVolFromServer(index-1)
}



///////////////// Single Api /////////////////


// 以数组的形式从数据库获取并返回所有 single 的数据, 并开始更新 single
async function getSingleList() {
    updateSingleList();
    return await db.getSingleList();
}


// 开始从服务器检测 single 的数据是否有更新
async function updateSingleList() {
    const url = `${IP}/api/singlesList`;
    // 从服务器获取一个包含所有 single 的日期的数组
    // 并按照日期由进到远进行排序
    let list = JSON.parse(await getData(url)).sort(sort);
    const latestSingle = list[0];
    const exist = await db.isSingleExist(latestSingle);
    // 如果最新一期的 single 已经存在于数据库, 直接返回
    if (exist) {
        console.log(`All singles data updated at ${new Date()}.`)
    }
    // 否则开始从服务器获取数据
    else
        getSingleFromServer(list);

    function sort(a, b) {
        return  parseInt(b.split('-').join('')) -
            parseInt(a.split('-').join(''))
    }
}


// 传入包含所有 single 的日期的数组和序号, 开始从服务器获取该 single 的数据
async function getSingleFromServer(list, index=0) {
    // 传入的序号的值必须小于传入的数组的长度
    if (index >= list.length) return false;
    // 如果该 track 已经存在于数据库, 直接返回
    if (await db.isSingleExist(list[index])) return false;
    const url = `${IP}/api/single/${list[index]}`;
    // 否则开始从服务器获取数据
    let data = await getData(url);
    data = JSON.parse(data);

    // 如果该 single 不存在, 服务器将会返回一个带有 'error' 的 JSON 数据
    if ('error' in data)
        // 这时直接跳过该 single, 开始获取下一期 single 的数据
        return getSingleFromServer(list, index+1);

    db.addSingle(data);

    // 该 track 数据获取完毕, 开始获取下一期 track
    await getSingleFromServer(list, index+1);
}
