import {
    getDB,
    find as findDB,
    findOne as findOneDB,
    insert as insertDB
} from "./operations";
import { FindOptions, ArticleTrack } from "../types";

const db: Nedb = getDB("article-track");

function find<T = ArticleTrack>(options: FindOptions): Promise<T[]> {
    return findDB({
        db: db,
        ...options
    });
}

function findOne(query: object): Promise<Maybe<ArticleTrack>> {
    return findOneDB<ArticleTrack>(db, query);
}

function insert(items: ArticleTrack[]): Promise<ArticleTrack[]> {
    return insertDB<ArticleTrack>(db, items);
}

export { find, findOne, insert };
