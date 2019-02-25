import PouchDB from 'pouchdb';
import { VolInfo } from "../types";
import {getIPC} from "../utils";


class VolDB {
    public init = async () => {
        const ipc = await getIPC();
        this.db.createIndex({
            index: {
                fields: ['id']
            }
        });
        const vols = ipc.getPreloadVols();
        // await this.saveVols(vols);
        console.log(this.db);
        await this.getLatestVol();
    };

    protected db: PouchDB.Database = new PouchDB('vols');

    public saveVols = (vols: VolInfo[]): Promise<(PouchDB.Core.Response | PouchDB.Core.Error)[]> => {
        return this.db.bulkDocs(vols);
    };

    public getVols = async () => {
        const vols = await this.db.allDocs();
        return vols.rows;
    };

    public getLatestVol = async () => {
        const vol = await this.db.find({
            selector: {},
            sort: ['vol'],
            limit: 1
        });
        console.log(vol);
    }
}

const volDB = new VolDB();

(async () => {
    await volDB.init();
})();

export {
    volDB
}
