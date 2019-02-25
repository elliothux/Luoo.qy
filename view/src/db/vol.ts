import PouchDB from 'pouchdb';
import { VolInfo } from "../types";
import {getIPC} from "../utils";



class VolDB {
    public init = async () => {
        const ipc = await getIPC();
        console.log(ipc.getPreloadVols());
    };

    protected db: PouchDB.Database = new PouchDB('vols');

    public saveVol = (vol: VolInfo): Promise<PouchDB.Core.Response> => {
        return this.db.put(vol);
    };

    public getVols = async () => {
        const vols = await this.db.allDocs();
        return vols.rows;
    };

    public countVol = async () => {

    }
}

const volDB = new VolDB();

(async () => {
    console.log(await volDB.init());
})();

export {
    volDB
}
