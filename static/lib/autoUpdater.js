// 自动更新模块

const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const platform = require('os').platform();
const extract = require('extract-zip');
const walk = require('walk');
const getDate = require('./base').getData;
const downloadFile = require('./base').downloadFile;
const IP = require('./base').IP;


module.exports.checkUpdate = checkUpdate;


// 从服务器获取更新信息
async function getUpdatedInfo() {
    const url = `${IP}/api/updateInfo`;
    return  JSON.parse(await getDate(url));
}


// 解压更新文件
async function extractUpdateFile(filePath) {
    return new Promise((resolve, reject) => {
        return extract(
            filePath,
            {dir: path.join(filePath, '../')},
            error => {
                if (error) reject(error);
                else {
                    resolve(path.join(filePath, '../'));
                    fs.unlink(filePath)
                }
            }
        )
    })
}


// 将升级包中解压出的文件目录与安装目标目录对应
function getInstallPath(dirPath, fileList=[]) {
    let files = fs.readdirSync(dirPath);
    files = files.map(file => {
        if (file === '.DS_Store') return;
        const realPath = path.join(dirPath, file);
        if (fs.lstatSync(realPath).isDirectory())
            getInstallPath(realPath, fileList);
        else
            fileList.push(realPath)
    });
    return(fileList).map(filePath => ({
        filePath: filePath,
        installPath: path.join(__dirname, '../../', filePath.split('.upgrade')[1])
    }))
}


function installUpdate(data) {
    const filePath = data.filePath;
    const installPath = data.installPath;
    exec(`rm -rf ${path.join(__dirname, installPath)}`);
    exec(`cp ${filePath} ${installPath}`)
}


// 开始检查更新
async function checkUpdate(prevVersion) {
    platform === 'win32' ?
        exec(`rm ${path.join(__dirname, "../../.upgrade")}`) :
        exec(`rm -rf ${path.join(__dirname, "../../.upgrade")}`);
    const info = await getUpdatedInfo();
    if (info.version === prevVersion) {
        console.log('已经是最新版本!');
        return false;
    }
    console.log('开始更新...');
    let filePath = await downloadFile(info.url,
        path.join(__dirname, "../../.upgrade"),
        `v${info.version}.zip`);
    filePath = await extractUpdateFile(filePath);
    getInstallPath(filePath).map(each => installUpdate(each));
    return true;
}
