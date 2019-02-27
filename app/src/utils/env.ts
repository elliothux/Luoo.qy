
import { app } from "electron";

const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
const isDev: boolean = isEnvSet ? getFromEnv : !app.isPackaged;

const runPath: string = app.getAppPath();

export {
    isDev,
    runPath
}
