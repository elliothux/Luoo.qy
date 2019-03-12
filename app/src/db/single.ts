import {
    getDB,
    find as findDB,
    findOne as findOneDB,
    insert as insertDB
} from "./operations";
import { FindOptions, Single } from "../types";
import {requestArticles, requestSingles} from "../utils";

const db: Nedb = getDB("single");

function find<T = Single>(options: FindOptions): Promise<T[]> {
    return findDB({
        db: db,
        ...options
    });
}

function findOne(query: object): Promise<Maybe<Single>> {
    return findOneDB<Single>(db, query);
}

function insert(items: Single[]): Promise<Single[]> {
    return insertDB<Single>(db, items);
}

export { find, findOne, insert };
