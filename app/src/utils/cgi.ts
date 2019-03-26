import { getJSON } from "./request";
import { ArticleInfo, RetData, Single, VolInfo } from "../types";
import camelcase = require("camelcase-keys");


async function getRetDataJSON<T>(url: string): Promise<T> {
  const response = await getJSON({ url });
  const { data } = response as RetData<T>;

  if (!data) {
    throw new Error(`Empty data while get ${url}`);
  }

  return camelcase(data, { deep: true });
}

function requestVols(from: number): Promise<VolInfo[]> {
  const url = `http://127.0.0.1:8087/api/vols/${from}`;
  return getRetDataJSON<VolInfo[]>(url);
}

function requestSingles(from: number): Promise<Single[]> {
  const url = `http://127.0.0.1:8087/api/singles/${from}`;
  return getRetDataJSON<Single[]>(url);
}

function requestArticles(from: number): Promise<ArticleInfo[]> {
  const url = `http://127.0.0.1:8087/api/articles/${from}`;
  return getRetDataJSON<ArticleInfo[]>(url);
}

export { requestVols, requestSingles, requestArticles };
