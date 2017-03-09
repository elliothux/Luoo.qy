const request = require('request-promise');
const db = require('./db');


module.exports.getData = getData;
module.exports.getVolList = getVolList;
module.exports.getSingleList = getSingleList;


const IP = 'http://127.0.0.1:5000';


///////////////// Base functions /////////////////

// Passing an url to get data of the url
async function getData(url) {
    return request(url)
        .then(data => {
            return data;
        })
        .catch(error => console.log(error))
}


///////////////// Vol Api /////////////////

// Get data of all vol as a list
async function getVolList() {
    updateVolList();
    return await db.getVolList();
}


// Update the data of vol in database from server
async function updateVolList() {
    const url = `${IP}/api/latestVol`;
    const latestVol = parseInt(await getData(url));
    const exist = await db.isVolExist(latestVol);
    // If the latest vol is already in database, just do nothing
    if (exist) {
        console.log(`All vol data updated at ${new Date()}.`)
    }
    // Else, start update vol data from server
    else
        getVolFromServer(latestVol);
}


// Passing the index of vol to start update vol data from server
async function getVolFromServer(index) {
    // Vol index must greater than 0
    if (index <= 0) return false;
    const url = `${IP}/api/vol/${index}`;
    // Get data of the vol from server
    let data = await getData(url);
    data = JSON.parse(data);

    // If vol is not exist,
    // server will return data which contains property 'error
    if ('error' in data)
        return getVolFromServer(index-1);

    // Parse data of tracks in vol and sort it by it's order
    data.tracks = JSON.parse(data.tracks).map(track => JSON.parse(track))
        .sort((a, b) => parseInt(a.order) - parseInt(b.order));
    db.addVol(data);

    // Start get data of next vol
    await getVolFromServer(index-1)
}



///////////////// Single Api /////////////////

// Get data of all singles as a list
async function getSingleList() {
    updateSingleList();
    return await db.getSingleList();
}


// Update the data of singles in database from server
async function updateSingleList() {
    const url = `${IP}/api/singlesList`;
    let list = JSON.parse(await getData(url)).sort(sort);
    const latestSingle = list[0];
    const exist = await db.isSingleExist(latestSingle);
    // If the latest single is already in database, just do nothing
    if (exist) {
        console.log(`All singles data updated at ${new Date()}.`)
    }
    // Else, start update single data from server
    else
        getSingleFromServer(list);

    function sort(a, b) {
        return  parseInt(b.split('-').join('')) -
            parseInt(a.split('-').join(''))
    }
}


// Passing the list of singles and the index of single
// to update singles data from server
async function getSingleFromServer(list, index=0) {
    // Single index must smaller than the length of list
    if (index >= list.length) return false;
    if (await db.isSingleExist(list[index])) return false;
    const url = `${IP}/api/single/${list[index]}`;
    // Get data of the single from server
    let data = await getData(url);
    data = JSON.parse(data);

    // If the single is not exist,
    // server will return data which contains property 'error'
    if ('error' in data)
        return getSingleFromServer(list, index+1);

    db.addSingle(data);

    // Start get data of next vol
    await getSingleFromServer(list, index+1);
}