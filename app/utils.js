const request = require('request');
const camelcase = require('camelcase-keys');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    try {
      request.get(url, (error, response, body) => {
        if (error || !response || response.statusCode !== 200) {
          return reject(error);
        }
        return resolve(camelcase(JSON.parse(body), { deep: true }));
      });
    } catch (e) {
      reject(e);
    }
  });
}

function requestVols(from) {
  const url = `http://127.0.0.1:8087/api/vols/${from}`;
  return getJSON(url);
}

function requestSingles(from) {
  const url = `http://127.0.0.1:8087/api/singles/${from}`;
  return getJSON(url);
}

function requestArticles(from) {
  const url = `http://127.0.0.1:8087/api/articles/${from}`;
  return getJSON(url);
}

module.exports = {
  requestVols,
  requestSingles,
  requestArticles,
};
