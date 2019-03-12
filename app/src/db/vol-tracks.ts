import {
    getDB,
    find as findDB,
    findOne as findOneDB,
    insert as insertDB
} from "./operations";
import { FindOptions, VolTrack } from "../types";

const db: Nedb = getDB("vol-track");

function find<T = VolTrack>(options: FindOptions): Promise<T[]> {
    return findDB({
        db: db,
        ...options
    });
}

function findOne(query: object): Promise<Maybe<VolTrack>> {
    return findOneDB<VolTrack>(db, query);
}

function insert(items: VolTrack[]): Promise<VolTrack[]> {
    return insertDB<VolTrack>(db, items);
}

export { find, findOne, insert };
