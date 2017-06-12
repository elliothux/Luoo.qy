const DataStore = require('nedb');
const path = require('path');
const colors = require('colors');


module.exports = {
    vol: {
        add: addVol,
        get: getVolList,
        isExist: async volIndex => await isExist({ vol: volIndex }, vol)
    },
    single: {
        add: addSingle,
        get: getSingleList,
        isExist: async date => await isExist({ date: date }, single)
    }
};


const vol = new DataStore({
    filename: path.join(__dirname, '../../db/vol'),
    autoload: true
});
const single = new DataStore({
    filename: path.join(__dirname, '../../db/single'),
    autoload: true
});


async function addVol(data) {
    if (await isExist({ vol: data.vol }, vol))
        throw new Error(`Add vol failed for vol${data.vol} already existing`);
    data = Object.assign({ liked: false, likedDate: '' }, data);
    data.vol = parseInt(data.vol);

    const newDoc = await _insert(data, vol);
    console.log(`Add success: vol${data.vol}`.green);
    return newDoc;
}


async function getVolList() {
    return (await _find({}, vol))
        .sort((a, b) => (b.vol - a.vol))
}


async function addSingle(data) {
    if (await isExist({ date: data.date }, single))
        throw new Error(`Add single failed for single${data.date} already exist`);
    data = Object.assign({ liked: false }, data);
    data.date = parseInt(data.date);

    const newDoc = await _insert(data, single);
    console.log(`Add success: single${data.date}`.green);
    return newDoc;
}


async function getSingleList() {
    return (await _find({}, single))
        .sort((a, b)  => (b.date - a.date))
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


function _find(arg, db) {
    (!arg || typeof arg !== 'object') && (arg = {});
    return new Promise((resolve, reject) => {
        db.find(arg).exec(function (error, docs) {
            error && reject(`An error happened whiling handling find: ${error}`);
            resolve(docs);
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
