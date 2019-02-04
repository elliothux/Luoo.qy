const { app, BrowserWindow, ipcMain } = require('electron');
const { requestVols } = require("./utils");


if (require("electron-squirrel-startup")) {
  app.quit();
} else {
  Object.defineProperty(global, "ipc", {
    value: {
      requestVols
    }
  });
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Luoo.qy",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`http://localhost:3000/`);

  mainWindow.webContents.openDevTools();
  mainWindow.setTitle("Luoo.qy");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

