const Datastore = require('nedb');
const path = require('path');


const volPath = path.join(__dirname, '../../db/vol');
const vol = new Datastore({ filename: volPath, autoload: true });


module.exports.addVol = addVol;
module.exports.getVolList = getVolList;
module.exports.isVolExist = isVolExist;


///////////////// Base Database Method /////////////////

// Rewrite insert method of database to async / await
async function insert(arg) {
    // Arguments must be an object
    if (!arg || typeof arg !== 'object') {
        console.error(`Function insert except an object not ${typeof arg} as the argument.`);
        return false;
    }

    return new Promise((resolve, reject) => {
        vol.insert(arg, (error, doc) => {
            error && reject(`An error happened whiling handling database: ${error}`);
            resolve(doc);
        })
    })
}


// Rewrite find method of database to async / await
async function find(arg) {
    !arg && (arg = {});
    if (typeof arg !== 'object') {
        arg = {};
        console.error(`Function find except an object not ${typeof arg} as the argument.`)
    }

    return new Promise((resolve, reject) => {
        vol.find(arg).exec(function (error, docs) {
            if (error)
                reject(new Error(`Get vol list failed.`));
            if (docs)
                resolve(docs);
        })
    })
}


// Rewrite unset method of database to async / await
async function remove(arg) {
    if (!arg || typeof arg !== 'object') {
        console.error(`Function find except an object not ${typeof arg} as the argument.`);
        return false;
    }

    return new Promise((resolve, reject) => {
        vol.update(arg, {$unset: {vol: arg.vol}}, {}, function (error) {
            error && reject(`An error happened while handling unset: ${error}`);
            resolve()
        })
    })
}

///////////////// Vol Api /////////////////

// Passing data to add a vol and return data of this new vol
async function addVol(data) {
    // This function expect an object as it's argument
    typeof data !== 'object' &&
        console.error(`Function addVol expect an object arguments, not ${typeof data}.`);

    // Check all required data in the argument
    if (!'title' in data ||
        !'vol' in data ||
        !'cover' in data ||
        !'date' in data ||
        !'length' in data ||
        ! 'tracks' in data) {
        console.error('Add vol failed with invalid arguments.');
        return false;
    }

    // Parse data
    data.vol = parseInt(data.vol);
    const exist = await isVolExist(data.vol);

    // If the vol is already exist, do not add and return
    if (exist) {
        console.error(`Add vol failed for vol${data.vol} already exist`);
        return false;
    }

    // Add vol if it's not exist
    const newDoc = await insert(data);
    console.log(`Add success: Vol ${data.vol}`);
    return newDoc;
}


// Pass index of vol and delete this vol
async function deleteVol(volIndex) {
    // This function expect an int type as it's argument
    if (!volIndex || !parseInt(volIndex)) {
        console.error(`Function deleteVol expect an valid arguments which is or can be convert to an int type.`);
        return false;
    }
    volIndex = parseInt(volIndex);
    await remove({vol: volIndex});
    console.log(`Delete success: Vol ${volIndex}`);
}


// Return all vol data as a list
async function getVolList() {
    return (await find())
        // Sort all vol data by their vol index
        .sort((a, b) => parseInt(b.vol) - parseInt(a.vol));
}


// Passing an int type to detect is a vol exist
async function isVolExist(volIndex) {
    // This function expect an int type as it's argument
    if (!volIndex || !parseInt(volIndex))
        console.error(`Function isVolExist expect an valid arguments which is or can be convert to an int type.`);

    volIndex = parseInt(volIndex);
    const doc = await find({vol: volIndex});
    return doc.length > 0;
}
