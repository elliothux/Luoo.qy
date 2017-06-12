const request = require('request-promise-native');
const db = require('./db');
const address = require('../../package.json').config.server;


async function updateVol(preVol) {
    const data = JSON.parse(await request(`http://${address}/vols/${preVol}`));
    if (data.length === 0) return console.log(`All vol updated`);
    for (vol of data)
        db.vol.add(vol)
}

async function updateSingle(preSingle) {
    const data = JSON.parse(await request(`http://${address}/singles/${preSingle}`));
    if (data.length === 0) return console.log(`All single updated`);
    for (single of data)
        db.single.add(single)
}
