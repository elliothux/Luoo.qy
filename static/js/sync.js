const request = require('request-promise-native');
const db = require('./db');
const user = require('./user');
const config = require('./config');
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
    for (vol of data) {
        db.vol.add(vol);
        for (track of vol.tracks)
            db.vol.addTrack(track)
    }
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
    let likedVols = config.get('likedVols');
    if (liked) likedVols.push({
        vol: volIndex,
        date: (() => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1 < 10 ?
                `0${date.getMonth() + 1}` : date.getMonth() + 1;
            const day = date.getDate();
            return parseInt(`${year}${month}${day}`)
        })()
    });
    else for (let i=0; i<likedVols.length; i++)
        likedVols[i].vol === volIndex &&
            (likedVols[i].liked = false)
    config.set({ likedVols: likedVols })
}


async function likeVolTrack(volIndex, trackIndex, volId, trackId, liked) {
    await user.like({
        type: 'volTrack',
        id: trackId,
        from: volId,
    });
    _likedTrackToConfig(trackId, liked);
}


async function likeSingle(singleDate, singleId, fromId, liked) {
    await user.like({
        type: 'single',
        id: singleId,
        from: fromId,
    });
    _likedTrackToConfig(singleId, liked);
}


function _likedTrackToConfig(id, liked) {
    let likedTracks = config.get('likedTracks');
    if (liked) likedTracks.push(id);
    else for (let i=0; i<likedTracks.likedVols; i++)
        if (likedTracks[i] === id) {
            likedTracks = likedTracks.slice(0, i).concat(likedTracks.slice(i + 1, likedTracks.length));
            break
        }
    config.set({ likedTracks: likedTracks })
}
