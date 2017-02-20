const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow} = electron;
const devTools =  require('electron-devtools-installer');


const getVolList = require('./static/lib/base').getVolList;
const getTrackList = require('./static/lib/base').getTrackList;


///////////////// Window //////////////////

let win;

if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(
        `/Users/huqingyang/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.0.12_0`
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


    devTools.default(devTools.REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
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

///////////////// REMOTE FUNCTION /////////////////

exports.getVolList = getVolList;
exports.getTrackList = getTrackList;
