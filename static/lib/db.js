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


///////////////// Base Database Method /////////////////

// Rewrite insert method of database to async / await
async function insert(arg, db) {
    // Arguments must be an object
    if (!arg || typeof arg !== 'object') {
        console.error(`Function insert except an object not ${typeof arg} as the argument.`);
        return false;
    }

    return new Promise((resolve, reject) => {
        db.insert(arg, (error, doc) => {
            error && reject(`An error happened whiling handling database: ${error}`);
            resolve(doc);
        })
    })
}


// Rewrite find method of database to async / await
async function find(arg, db) {
    !arg && (arg = {});
    if (typeof arg !== 'object') {
        arg = {};
        console.error(`Function find except an object not ${typeof arg} as the argument.`)
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


// Rewrite unset method of database to async / await
async function remove(arg, db) {
    let com;
    if (db === vol)
        com = {vol: true};
    else if (db === single)
        com = {date: true};

    return new Promise((resolve, reject) => {
        db.update(arg, {$unset: com}, {}, function (error) {
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
    const exist = await isVolExist(data.vol, vol);

    // If the vol is already exist, do not add and return
    if (exist) {
        console.error(`Add vol failed for vol${data.vol} already exist`);
        return false;
    }

    // Add vol if it's not exist
    const newDoc = await insert(data, vol);
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
    await remove({vol: volIndex}, vol);
    console.log(`Delete success: Vol ${volIndex}`);
}


// Return all vol data as a list
async function getVolList() {
    return (await find({}, vol))
        // Sort all vol data by their vol index
        .sort((a, b) => parseInt(b.vol) - parseInt(a.vol));
}


// Passing an int type to detect is a vol exist
async function isVolExist(volIndex) {
    // This function expect an int type as it's argument
    if (!volIndex || !parseInt(volIndex))
        console.error(`Function isVolExist expect an valid arguments which is or can be convert to an int type.`);

    volIndex = parseInt(volIndex);
    const doc = await find({vol: volIndex}, vol);
    return doc.length > 0;
}


///////////////// Single Api /////////////////


async function addSingle(data) {
    // This function expect an object as it's argument
    typeof data !== 'object' &&
    console.error(`Function addVol expect an object arguments, not ${typeof data}.`);

    // Check all required data in the argument
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

    const exist = await isVolExist(data.date, single);

    // If the single is already exist, do not add and return
    if (exist) {
        console.error(`Add single failed for single${data.date} already exist`);
        return false;
    }

    // Add single if it's not exist
    const newDoc = await insert(data, single);
    console.log(`Add success: single ${data.date}`);
    return newDoc;
}


async function isSingleExist(date) {
    const doc = await find({date: date}, single);
    return doc.length > 0;
}


// Pass date of single and delete this single
async function deleteSingle(date) {
    await remove({date: date}, single);
    console.log(`Delete success: Single ${date}`);
}


// Return all vol data as a list
async function getSingleList() {
    return (await find({}, single));
    // Sort all vol data by their vol index
    //     .sort((a, b) => parseInt(b.vol) - parseInt(a.vol));
}

async function test1() {
    const data = {
        "title" : "琴声阵阵",
        "vol" : 1000,
        "cover" : "http://img-cdn.luoo.net/pics/vol/5898bb78444cf.jpg?imageView2/1/w/640/h/452",
        "description" : "<br>        本期音乐为手风琴音乐专题。<br><br>手风琴给人的感觉大致分为两种。一种是在悠长中低徊流转，犹如白桦林边思念的少年；另外一种是欢喜中盈满雀跃，如同《天使爱美丽》中的艾米莉，长街里轻轻一跃的衣袂荡漾。无论是哪一种，手风琴营造出来的氛围总能够轻易窥探一个人的灵魂，以及一个城市的心绪。<br><br>这期音乐载着空街寂寥的漫长与暖暖的满心欢喜，用一种敏感极致的方式，恍惚了这个世界。这时，我们只好什么都不做，安静的待在这个世界里。<br><br>Cover From 五条人. Photo By 张小肆.<br>",
        "date" : "2017-02-07",
        "length" : 10,
        "tag" : "#氛围"
    };
    console.log(await isVolExist(data.vol));
    console.log(await addVol(data));
    console.log(await isVolExist(data.vol));
    await deleteVol(data.vol);
    console.log(await isVolExist(data.vol));
}

async function test2() {
    const data = {
        "name" : "TARDY",
        "artist" : "The White Tulips",
        "cover" : "http://img-cdn.luoo.net/pics/performers/7088/m_58b92358cd339.jpg?imageView2/1/w/750/h/530",
        "url" : "http://mp3-cdn.luoo.net/low/chinese/20170303.mp3",
        "description" : " 来自厦门的The White Tulips在经历了最近的人员更换之后，也来带了音乐风格上的变化。四位成员的审美差异让The White Tulips风格不再局限于以前的直线噪音流行和Shoegaze了，现在他们在原有的曲风中融入了80年代灵魂乐，迷幻摇滚和爵士等风格。新单曲TARDY的灵感也来自于灵魂乐的律动，将律动与美式噪音结合，探索出更丰富的表现形式，并带有独特的海滨城市的浪漫。 ",
        "date" : "2017-03-03",
        "recommender" : "推荐人： LUO"
    };
    console.log(await isSingleExist(data.date));
    console.log(await addSingle(data));
    console.log(await isSingleExist(data.date));
    await deleteSingle(data.date);
    console.log(await isSingleExist(data.date));
}
