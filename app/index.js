import { app, BrowserWindow } from 'electron';


if (require('electron-squirrel-startup')) {
  app.quit();
}


let mainWindow;


const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Luoo.qy'
  });

  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`http://localhost:3000/`);

  mainWindow.webContents.openDevTools();
  mainWindow.setTitle('Luoo.qy');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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
