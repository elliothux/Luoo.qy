const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = electron;


const getVolList = require('./static/lib/base').getVolList();


let win;

if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(
        '/Users/huqingyang/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi'
    );
}

function createWindiw() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
});

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/static/index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindiw);

app.on('window-all-closed', () => {
    if (process.platform !== 'drawin')
        app.quit();
});

app.on('activate', () => {
    if (win === null)
        createWindiw()
});




exports.getVolList = function (index = 0) {
    getVolList(index).then(data)
}