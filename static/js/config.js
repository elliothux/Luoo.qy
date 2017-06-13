const fs = require('node-fs-extra');
const path = require('path');


module.exports = Object.assign(module.exports, {
    set: setConfig,
    get: getConfig,
    init: initConfig
});


const target = path.join(__dirname, '../../user/config.json');
const config = require(target);


function getConfig(option) {
    const config = fs.readJSONFileSync(target, 'utf-8');
    return option ? config[option] : config
}


function setConfig(newConfig) {
    newConfig = Object.assign(config, newConfig);
    fs.writeFileSync(target, JSON.stringify(newConfig), 'utf-8');
    return newConfig;
}


function initConfig() {
    setConfig({
        "mail": "",
        "password": "",
        "name": "",
        "id": "",
        "avatar": "",
        "LUOOSESS": "",
        "lult": "",
        "likedVols": [],
        "likedTracks": []
    })
}