import * as path from "path";
import { app, BrowserWindow } from "electron";
import { injectIPC, isDev, runPath } from "./utils";

function launch(): void {
  injectIPC(global);

  let mainWindow: Maybe<BrowserWindow>;

  app.on("ready", createWindow);

  app.on("window-all-closed", onWindowAllClosed);

  app.on("activate", onAppActive);

  function createWindow(): void {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      title: "Luoo.qy",
      show: false,
      webPreferences: {
        nodeIntegration: true,
        devTools: true,
        allowRunningInsecureContent: true
      }
    });

    const htmlPath = path.join(runPath, "./dist/view/index.html");
    mainWindow.loadURL(isDev ? "http://localhost:3000/" : `file://${htmlPath}`);

    mainWindow.on("closed", () => {
      mainWindow = null;
    });

    mainWindow.once("ready-to-show", () => {
      if (mainWindow) {
        mainWindow.show();
      }
    });

    if (isDev) {
      console.log("dev");
      mainWindow.webContents.openDevTools();
    } else {
      console.log("prod");
      mainWindow.webContents.openDevTools();
      // closeDevTools();
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

try {
  launch();
} catch (e) {
  console.error('App error: ', e);
  process.exit(0);
}
