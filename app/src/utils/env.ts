
import { app } from "electron";

const isDev: boolean = process.env.NODE_ENV === "development";
const runPath: string = app.getAppPath();

export {
    isDev,
    runPath
}
