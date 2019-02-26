import { get } from "request";
import camelcase = require("camelcase-keys");
import {ArticleInfo, RetData, Single, VolInfo} from "../types";


function getJSON<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            get(url, (error, response, body) => {
                if (error || !response || response.statusCode !== 200) {
                    return reject(error);
                }

                const { data } = JSON.parse(body) as RetData<T>;
                if (!data) {
                    reject(new Error(`Empty data while get ${url}`));
                }

                return resolve(camelcase(data, { deep: true }) as T);
            });
        } catch (e) {
            reject(e);
        }
    });
}

function requestVols(from: number): Promise<VolInfo[]> {
    const url = `http://127.0.0.1:8087/api/vols/${from}`;
    return getJSON<VolInfo[]>(url);
}

function requestSingles(from: number): Promise<Single[]> {
    const url = `http://127.0.0.1:8087/api/singles/${from}`;
    return getJSON<Single[]>(url);
}

function requestArticles(from: number): Promise<ArticleInfo[]> {
    const url = `http://127.0.0.1:8087/api/articles/${from}`;
    return getJSON<ArticleInfo[]>(url);
}

export { requestVols, requestSingles, requestArticles };
