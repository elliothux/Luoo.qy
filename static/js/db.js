const Datastore = require('nedb');
const path = require('path');


const vol = new Datastore({
    filename: path.join(__dirname, '../../db/vol'),
    autoload: true
});
const single = new Datastore({
    filename: path.join(__dirname, '../../db/single'),
    autoload: true
});
const likedVols = new Datastore({
    filename: path.join(__dirname, '../../db/likedVols'),
    autoload: true
});


module.exports = {
    vol: {
        get: getVolList,
        exist: isVolExist,
        add: addVol
    },
    single: {
        get: getSingleList,
        exist: isSingleExist,
        add: addSingle
    }
};


///////////////// 基本的操作数据库的函数 /////////////////

// 封装 insert 方法
function insert(arg, db) {
    if (!arg || typeof arg !== 'object')
        throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);

    return new Promise((resolve, reject) => {
        db.insert(arg, (error, doc) => {
            error && reject(`An error happened whiling handling database: ${error}`);
            resolve(doc);
        })
    })
}


// 封装 find 方法
function find(arg, db) {
    (!arg || typeof arg !== 'object') && (arg = {});

    return new Promise((resolve, reject) => {
        db.find(arg).exec(function (error, docs) {
            if (error)
                reject(`Get vol list failed.`);
            if (docs)
                resolve(docs);
        })
    })
}


// 封装 remove 方法
function remove(arg, db) {
    return new Promise((resolve, reject) => {
        db.remove(arg, {}, function (error) {
            error && reject(`An error happened while handling unset: ${error}`);
            resolve()
        })
    })
}


///////////////// Vol Api /////////////////


// 传入 vol 的数据, 添加新的 vol 并返回新 vol 的数据
async function addVol(data) {
    if (!'title' in data ||
        !'vol' in data ||
        !'cover' in data ||
        !'date' in data ||
        !'length' in data ||
        ! 'tracks' in data)
        throw new Error('Add vol failed with invalid arguments.');

    data.vol = parseInt(data.vol);
    if (await isVolExist(data.vol, vol))
        throw new Error(`Add vol failed for vol${data.vol} already existing`);

    const newDoc = await insert(data, vol);
    console.log(`Add success: Vol ${data.vol}`);
    return newDoc;
}


// 传入 vol 的编号, 删除该 vol
async function deleteVol(volIndex) {
    if (!volIndex || !parseInt(volIndex))
        throw new Error(`Function 'deleteVol' expect an valid arguments which is or can be convert to an int type.`);
    volIndex = parseInt(volIndex);
    await remove({vol: volIndex}, vol);
    console.log(`Delete success: Vol ${volIndex}`);
}


// 以数组的形式返回所有的 vol 的数据
async function getVolList() {
    return (await find({}, vol))
    // 以 vol 的编号由大到小对 vol 的数据进行排序
        .sort((a, b) => parseInt(b.vol) - parseInt(a.vol));
}


// 传入 vol 的编号, 判断该 vol 是否存在
async function isVolExist(volIndex) {
    if (!volIndex || !parseInt(volIndex))
        throw new Error(`Function 'isVolExist' expect an valid arguments which is or can be convert to an int type.`);

    volIndex = parseInt(volIndex);
    const doc = await find({vol: volIndex}, vol);
    return doc.length > 0;
}


///////////////// Single Api /////////////////


// 传入 single 的数据, 添加新的 single 并返回新 single 的数据
async function addSingle(data) {
    if (!'name' in data ||
        !'artist' in data ||
        !'cover' in data ||
        !'url' in data ||
        !'description' in data ||
        ! 'date' in data ||
        ! 'recommender' in data)
        throw new Error('Add single failed with invalid arguments.');

    if (await isSingleExist(data.date, single))
        throw new Error(`Add single failed for single${data.date} already exist`);

    const newDoc = await insert(data, single);
    console.log(`Add success: single ${data.date}`);
    return newDoc;
}


// 传入 single 的日期, 删除该 single
async function deleteSingle(date) {
    await remove({date: date}, single);
    console.log(`Delete success: Single ${date}`);
}


// 以数组的形式返回所有的 single 的数据
async function getSingleList() {
    return (await find({}, single))
    // 以 single 的日期由近到远对 single 的数据进行排序
        .sort((a, b)  =>
            parseInt(b.date.split('-').join('')) -
            parseInt(a.date.split('-').join(''))
        );
}


// 传入 single 的日期, 判断该 single 是否存在
async function isSingleExist(date) {
    const doc = await find({date: date}, single);
    return doc.length > 0;
}


///////////////// Collection Api /////////////////

async function isCollectionExist(data) {
    // const doc = data.type === 'vol' ?
    //     await find({vol: data.vol}, likedVols) :
    //     await find({date: })
}