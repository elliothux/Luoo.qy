// 基本的数据库操作

const Datastore = require('nedb');
const path = require('path');


const volPath = path.join(__dirname, '../../db/vol');
const vol = new Datastore({ filename: volPath, autoload: true });
const singlePath = path.join(__dirname, '../../db/single');
const single = new Datastore({ filename: singlePath, autoload: true });


module.exports.addVol = addVol;
module.exports.getVolList = getVolList;
module.exports.isVolExist = isVolExist;
module.exports.addSingle = addSingle;
module.exports.getSingleList = getSingleList;
module.exports.isSingleExist = isSingleExist;


///////////////// 基本的操作数据库的函数 /////////////////

// 使用 async / await 重写 insert 方法
async function insert(arg, db) {
    // 第一个参数必须为一个对象
    if (!arg || typeof arg !== 'object') {
        console.error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
        return false;
    }

    return new Promise((resolve, reject) => {
        db.insert(arg, (error, doc) => {
            error && reject(`An error happened whiling handling database: ${error}`);
            resolve(doc);
        })
    })
}


// 使用 async / await 重写 find 方法
async function find(arg, db) {
    !arg && (arg = {});
    if (typeof arg !== 'object') {
        arg = {};
        console.error(`Function 'find' except an object not ${typeof arg} as the argument.`)
    }

    return new Promise((resolve, reject) => {
        db.find(arg).exec(function (error, docs) {
            if (error)
                reject(new Error(`Get vol list failed.`));
            if (docs)
                resolve(docs);
        })
    })
}


// 使用 async / await 重写 remove 方法
async function remove(arg, db) {
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
    // data 必须为一个对象
    typeof data !== 'object' &&
        console.error(`Function 'addVol' expect an object arguments, not ${typeof data}.`);

    // 检查 data 数据的完整性
    if (!'title' in data ||
        !'vol' in data ||
        !'cover' in data ||
        !'date' in data ||
        !'length' in data ||
        ! 'tracks' in data) {
        console.error('Add vol failed with invalid arguments.');
        return false;
    }

    // 解析 data 中的 vol 数据
    data.vol = parseInt(data.vol);
    const exist = await isVolExist(data.vol, vol);

    // 若该 vol 已存在, 返回 false
    if (exist) {
        console.error(`Add vol failed for vol${data.vol} already existing`);
        return false;
    }

    // 或 vol 不存在, 则添加 vol
    const newDoc = await insert(data, vol);
    console.log(`Add success: Vol ${data.vol}`);
    return newDoc;
}


// 传入 vol 的编号, 删除该 vol
async function deleteVol(volIndex) {
    if (!volIndex || !parseInt(volIndex)) {
        console.error(`Function 'deleteVol' expect an valid arguments which is or can be convert to an int type.`);
        return false;
    }
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
        console.error(`Function 'isVolExist' expect an valid arguments which is or can be convert to an int type.`);

    volIndex = parseInt(volIndex);
    const doc = await find({vol: volIndex}, vol);
    return doc.length > 0;
}


///////////////// Single Api /////////////////


// 传入 single 的数据, 添加新的 single 并返回新 single 的数据
async function addSingle(data) {
    // data 必须为一个对象// This function expect an object as it's argument
    typeof data !== 'object' &&
    console.error(`Function 'addSingle' expect an object arguments, not ${typeof data}.`);

    // 检查 data 数据的完整性
    if (!'name' in data ||
        !'artist' in data ||
        !'cover' in data ||
        !'url' in data ||
        !'description' in data ||
        ! 'date' in data ||
        ! 'recommender' in data) {
        console.error('Add single failed with invalid arguments.');
        return false;
    }

    const exist = await isSingleExist(data.date, single);

    // 若该 single 已存在, 返回 false
    if (exist) {
        console.error(`Add single failed for single${data.date} already exist`);
        return false;
    }

    // 或 single 不存在, 则添加 single
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
