const path = require("path");
const { app, BrowserWindow } = require("electron");
const { requestVols, requestSingles, requestArticles } = require("./utils");
const db = require("./db");

const isProduction = process.env.NODE_ENV === "production";

// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
} else {
  Object.defineProperty(global, "ipc", {
    value: {
      requestVols,
      requestSingles,
      requestArticles,
      db
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

  const htmlPath = path.join(__dirname, "../view/build/index.html");
  mainWindow.loadURL(
    isProduction ? `file://${htmlPath}` : "http://localhost:3000/"
  );

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
