import { get } from "request";
import camelcase from "camelcase-keys";

function getJSON<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      get(url, (error, response, body) => {
        if (error || !response || response.statusCode !== 200) {
          return reject(error);
        }
        return resolve(camelcase(JSON.parse(body), { deep: true }) as T);
      });
    } catch (e) {
      reject(e);
    }
  });
}

function requestVols(from: number) {
  const url = `http://127.0.0.1:8087/api/vols/${from}`;
  return getJSON(url);
}

function requestSingles(from: number) {
  const url = `http://127.0.0.1:8087/api/singles/${from}`;
  return getJSON(url);
}

function requestArticles(from: number) {
  const url = `http://127.0.0.1:8087/api/articles/${from}`;
  return getJSON(url);
}

export { requestVols, requestSingles, requestArticles };
