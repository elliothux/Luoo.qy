const electron = require('electron');
const os = require('os');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, globalShortcut} = electron;
const getVolList = require('./static/lib/base').getVolList;
const getSingleList = require('./static/lib/base').getSingleList;
const checkUpdate = require('./static/lib/autoUpdater').checkUpdate;


let win;

// 创建程序窗口
function createWindiw() {
    win = new BrowserWindow({
        width: 850,
        height: 620,
        minWidth: 700,
        minHeight: 550,
        center: true,
        show: false,
        titleBarStyle: 'hidden-inset',
        frame: true
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, './static/html/index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });

    win.on('ready-to-show', () => {
        win.show()
    });
}

// 注册快捷键
function shortCutRegister() {
    globalShortcut.register('CommandOrControl+W', () => {
        os.platform() === 'darwin' ?
            win.hide() : win.minimize();
    });
}


app.on('ready', () => {
    createWindiw();
    shortCutRegister();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'drawin')
        app.quit();
});

app.on('activate', () => {
    if (win === null)
        createWindiw();
    win.show();
    shortCutRegister();
});

app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll();
});

app.on('browser-window-focus', shortCutRegister);

app.on('will-quit', function () {
    globalShortcut.unregisterAll();
});


// 自动更新
checkUpdate(require('./package.json').version)
    .then((updated) => updated && console.log('自动更新完成!'));


///////////////// 供渲染进程调用的方法 /////////////////

exports.getVolList = getVolList;
exports.getSingleList = getSingleList;
exports.platform = os.platform();
