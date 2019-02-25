const path = require('path');
const { app, BrowserWindow } = require('electron');
const { requestVols, requestSingles, requestArticles } = require('./utils');
const db = require('./db');

const isDev = process.env.NODE_ENV === 'development';

// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
} else {
  Object.defineProperty(global, 'ipc', {
    value: {
      requestVols,
      requestSingles,
      requestArticles,
      db,
    },
  });
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Luoo.qy',
    allowEval: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
    },
  });

  const htmlPath = path.join(__dirname, './view/index.html');
  mainWindow.loadURL(isDev ? 'http://localhost:3000/' : `file://${htmlPath}`);

  mainWindow.setTitle('Luoo.qy');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
