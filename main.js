const electron = require('electron');
const path = require('path');
const url = require('url');
const platform = require('os').platform();
const menuTemplate = require('./static/js/menuTemplate');
const db = require('./static/js/db');
const {app, BrowserWindow, Menu } = electron;


let mainWindow = null;


// App events
app.on('ready', () => {
    mainWindow = openWindow(null, null, false);
    // Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate(app, win)));
});

app.on('window-all-closed', () => {
    platform !== 'darwin' && app.quit()
});

app.on('activate', () => {
    if (!mainWindow)
        mainWindow = openWindow(null, null, false);
    mainWindow.show();
});


exports = Object.assign(exports, {
    mainPath: path.join(__dirname),
    db: db
});


// Define a function to create window
function openWindow(filePath, options, isMax) {
    !filePath && (filePath = path.join(__dirname, './static/html/index.html'));
    !options && (options = {});
    options = Object.assign(
        {
            width: 950,
            height: 700,
            minWidth: 700,
            minHeight: 550,
            center: true,
            show: false
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

    win.on('closed', () => {
        win = null;
    });

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