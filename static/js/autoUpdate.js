const fs = require('node-fs-extra');
const path = require('path');
const extract = require('extract-zip');
const request = require('request');


module.exports = {
    check: check,
    install: install
};


const URL = `http://115.159.29.32/update/${{ darwin: 0, win32: 1, linux: 2 }[require('os').platform()] }/${require('../../package.json').version}`;
const target = path.join(__dirname, "../../upgrade/");


async function check() {
    fs.existsSync(target) && fs.removeSync(target);
    let data = await _getData(URL);
    if (!data) return false;
    let info = JSON.parse(data);
    if (info.type === 'none') return false;
    fs.mkdirsSync(target);
    let filePath = await _downloadFile(
        info.url, path.join(target, `./v${info.version}.zip`));
    return [info, filePath];
}


async function install(filePath) {
    console.log('Start install update...');
    filePath = await _extractUpdateFile(filePath);
    console.log(filePath);
    for (let paths of  _getInstallPath(filePath))
        _installUpdate(paths);
    console.log('Done');
    return true;
}


function _installUpdate(paths) {
    const { from, to } = paths;
    fs.existsSync(to) && fs.removeSync(to);
    !fs.existsSync(path.join(to, '../')) && fs.mkdirSync(path.join(to, '../'));
    fs.copySync(from, to);
}


function _getInstallPath(dirPath, fileList=[]) {
    fs.readdirSync(dirPath).map(file => {
        if (file === '.DS_Store') return;
        const from = path.join(dirPath, file);
        if (fs.lstatSync(from).isDirectory())
            _getInstallPath(from, fileList);
        else
            fileList.push(from)
    });
    return(fileList).map(from => ({
        from: from,
        to: path.join(__dirname, '../../', from.split('upgrade')[1])
    }))
}



function _extractUpdateFile(filePath) {
    return new Promise((resolve, reject) => {
        extract(
            filePath,
            {dir: path.join(filePath, '../')},
            error => {
                if (error) reject(error);
                else {
                    fs.removeSync(filePath);
                    resolve(path.join(filePath, '../'));
                }
            }
        )
    })
}


function _getData(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            error && reject(error);
            body && resolve(body);
        })
    })
}


function _downloadFile(url, pathName) {
    return new Promise((resolve, reject) => {
        request.head(url, function(){
            request(url).pipe(fs.createWriteStream(pathName))
                .on('close', () => resolve(pathName))
                .on('error', error =>  reject(error))
        });
    })
}