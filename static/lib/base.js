const request = require('request-promise');
const db = require('./_db');


module.exports.getVolList = getVolList;
module.exports.getData = getData;
module.exports.updateVolList = updateVolList;


const DISAPPEAR_VOL = [544, 566, 567, 568];

///////////////// Base functions /////////////////

async function getData(url) {
    return request(url)
        .then(data => {
            return JSON.parse(data)
        })
        .catch(error => console.log(error))
}


///////////////// Vol Api /////////////////

function getVolList() {
    updateVolList();
    return db.getVolList();
}


function updateVolList() {
    const url = 'http://127.0.0.1:5000/api/latestVol';
    return getData(url)
        .then(latestVol => {
            latestVol = parseInt(latestVol);
            db.isVolExist(latestVol).then(exist => {
                if (!exist)
                    startGetVolFromServer(latestVol)
            })
        })
        .catch(error => console.log(error))
}


function startGetVolFromServer(index) {
    index = parseInt(index);
    if (index <= 0)
        return;
    if (index in DISAPPEAR_VOL)
        return startGetVolFromServer(index -1);
    return db.isVolExist(index)
        .then(exist => {
            if (!exist) {
                getVolFromServer(index)
                    .then(data => {
                        startGetVolFromServer(index-1)
                    })
            }
            else console.log(`All vol add success.`)
        })
        .catch(error => console.log(error))
}



function getVolFromServer(index) {
    return getData(`http://127.0.0.1:5000/api/vol/${index}`)
        .then(data => {
            data.tracks = JSON.parse(data.tracks);
            db.addVol(data);
            console.log(`Add vol${data.vol} success.`);
            return(data)
        })
        .catch(error => console.log(error))
}


async function test() {
    // const data = await getData('http://127.0.0.1:5000/api/vol/862');
    // console.log(data)
}

test()