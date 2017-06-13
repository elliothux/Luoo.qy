const request = require('request-promise-native');
const db = require('./db');
const user = require('./user');
const address = require('../../package.json').config.server;


module.exports = {
    vol: {
        update: updateVol,
        like: likeVol,
        likeTrack: likeVolTrack
    },
    single: {
        update: updateSingle,
        like: likeSingle
    }
};


async function updateVol(preVol) {
    const data = JSON.parse(await request(`http://${address}/vols/${preVol}`));
    if (data.length === 0) return console.log(`All vol updated`);
    for (vol of data)
        db.vol.add(vol)
}

async function updateSingle(preDate) {
    const data = JSON.parse(await request(`http://${address}/singles/${preDate}`));
    if (data.length === 0) return console.log(`All single updated`);
    for (single of data)
        db.single.add(single)
}


async function likeVol(volIndex, volId, liked) {
    await user.like({
        type: 'vol',
        id: volId
    });
    await db.vol.like(volIndex, liked)
}


async function likeVolTrack(volIndex, trackIndex, volId, trackId, liked) {
    await user.like({
        type: 'volTrack',
        id: trackId,
        from: volId,
    });
    await db.vol.likeTrack(volIndex, trackIndex, liked)
}


async function likeSingle(singleDate, singleId, fromId, liked) {
    await user.like({
        type: 'single',
        id: singleId,
        from: fromId,
    });
    await db.single.like(singleDate, liked)
}
