import {requestArticles, requestSingles, requestVols} from "./cgi";
import * as vol from "../db/vol";


function injectIPC(target: object): void {
    Object.defineProperty(target, "ipc", {
        value: {
            request: {
                requestVols,
                requestSingles,
                requestArticles
            },
            db: {
                vol: {
                    getIds: vol.getIds,
                    getByIds: vol.getByIds
                }
            }
        }
    });
}

export {
    injectIPC
}
