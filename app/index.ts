import * as path from "path";
import { app, BrowserWindow } from "electron";
import { requestVols, requestSingles, requestArticles } from "./utils";
import {
  saveVol,
  saveVols,
  getVols,
  getVolFromTrackId,
  getLatestVol
} from "./db/vol";
import {
  saveSingle,
  saveSingles,
  getSingles,
  getLatestSingle
} from "./db/single";
import {
  saveArticle,
  saveArticles,
  getArticles,
  getLatestArticle,
  getArticleFromTrackId
} from './db/article';

const isDev = process.env.NODE_ENV === "development";

function launch(): void {
  const squirrel = require("electron-squirrel-startup");
  if (squirrel) {
    app.quit();
    return;
  } else {
    injectIPC();
  }

  let mainWindow: BrowserWindow | null;

  app.on("ready", createWindow);

  app.on("window-all-closed", onWindowAllClosed);

  app.on("activate", onAppActive);

  function createWindow(): void {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      title: "Luoo.qy",
      webPreferences: {
        nodeIntegration: true,
        devTools: isDev,
        allowRunningInsecureContent: true
      }
    });

    const htmlPath = path.join(__dirname, "./view/index.html");
    mainWindow.loadURL(isDev ? "http://localhost:3000/" : `file://${htmlPath}`);

    mainWindow.on("closed", () => {
      mainWindow = null;
    });

    if (isDev) {
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.webContents.on("devtools-opened", closeDevTools);
    }
  }

  function onWindowAllClosed(): void {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  function onAppActive(): void {
    if (!mainWindow) {
      createWindow();
    }
  }

  function closeDevTools(): void {
    if (mainWindow) {
      mainWindow.webContents.closeDevTools();
    }
  }
}

function injectIPC(): void {
  Object.defineProperty(global, "ipc", {
    value: {
      // Request
      requestVols,
      requestSingles,
      requestArticles,
      // VOl
      saveVol,
      saveVols,
      getVols,
      getLatestVol,
      getVolFromTrackId,
      // Single
      saveSingle,
      saveSingles,
      getSingles,
      getLatestSingle,
      // Article
      saveArticle,
      saveArticles,
      getArticles,
      getLatestArticle,
      getArticleFromTrackId
    }
  });
}

try {
  launch();
} catch (e) {
  console.error(e);
  process.exit(0);
}
