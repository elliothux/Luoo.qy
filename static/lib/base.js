const request = require('request-promise');
const db = require('./db');


module.exports.getVolList = getVolList;
module.exports.getData = getData;
module.exports.updateVolList = updateVolList;


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
    const url = 'http://127.0.0.1:5000/api/latestVol';
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
    const url = `http://127.0.0.1:5000/api/vol/${index}`;
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
