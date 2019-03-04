import * as path from "path";
import { app } from "electron";

const isEnvSet = "ELECTRON_IS_DEV" in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV || "0", 10) === 1;

const isElectron: boolean = !!app;
const isDev: boolean = !isElectron || (isEnvSet ? getFromEnv : !app.isPackaged);

const runPath: string = app ? app.getAppPath() : path.join(__dirname, "../../");

export { isElectron, isDev, runPath };
