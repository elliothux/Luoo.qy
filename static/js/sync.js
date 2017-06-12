const request = require('request-promise-native');
const colors = require('colors');
const db = require('./db');
const address = require('../../package.json').config.server;


async function updateVol(preVol) {
    const data = JSON.parse(await request(`http://${address}/vols/${preVol}`));
    if (data.length === 0) return console.log(`All vol updated`.green);
    for (vol of data)
        db.vol.add(vol)
    // console.log(data)
}

updateVol(0).then(a => console.log(a)).catch(e => console.error(e));