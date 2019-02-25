import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { VolInfo } from "../types";
import {getIPC} from "../utils";

PouchDB.plugin(PouchDBFind);

const db: PouchDB.Database = new PouchDB('vols');

db.createIndex({
    index: {
        fields: ['vol', 'id']
    }
});


class VolDB {
    public init = async () => {
        const ipc = await getIPC();
        const vols = ipc.getPreloadVols();
        console.time('save');
        await this.saveVols(vols);
        console.timeEnd('save');
        await this.getLatestVol();
    };


    public saveVols = (vols: VolInfo[]): Promise<(PouchDB.Core.Response | PouchDB.Core.Error)[]> => {
        return db.bulkDocs(vols);
    };

    public getVols = async () => {
        const vols = await db.allDocs();
        return vols.rows;
    };

    public getLatestVol = async () => {
        const vol = await db.find({
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
