const electron = require('electron');
const path = require('path');
const url = require('url');
const platform = require('os').platform();
const db = require('./static/js/db');
const user = require('./static/js/user');
const config = require('./static/js/config');
const sync = require('./static/js/sync');
const menuTemplate = require('./static/js/menuTemplate');
const { app, BrowserWindow, Menu, dialog } = electron;


let mainWindow = null;


// App events
app.on('ready', () => {
    mainWindow = openWindow(null, null, false);
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(app, win)));
});

app.on('window-all-closed', () => {
    app.quit()
});

app.on('activate', () => {
    mainWindow.show();
});


// Export modules for rendering process
exports = Object.assign(exports, {
    db: db,
    user: user,
    config: config,
    sync: sync,
    app: app,
    dialog: dialog
});


// Define a function to create window
function openWindow(filePath, options, isMax) {
    !filePath && (filePath = path.join(__dirname, './static/html/index.html'));
    !options && (options = {});
    options = Object.assign(
        {
            width: 960,
            height: 680,
            minWidth: 800,
            minHeight: 550,
            center: true,
            show: false,
            autoHideMenuBar: true
        },
        options
    );

    win = new BrowserWindow(options);
    isMax && win.maximize();

    win.loadURL(url.format({
        pathname: filePath,
        protocol: 'file',
        slashes: true
    }));

    win.on('ready-to-show', () => {
        win.show()
    });

    // const devToolsPath = {
    //     darwin: `/Users/huqingyang/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.3_0`,
    //     win32: `C:\\Users\\HuQingyang\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1\\Extensions\\nhdogjmejiglipccpnnnanhbledajbpd\\3.1.2_0`
    // }[platform];
    // BrowserWindow.addDevToolsExtension(devToolsPath);

    return win;
}