const request = require("request");

function requestVols(from) {
  const url = `http://127.0.0.1:8087/api/vols/${from}`;
  return getJSON(url);
}

function getJSON(url) {
  return new Promise((resolve, reject) => {
    try {
      request.get(url, (error, response, body) => {
        if (error || !response || response.statusCode !== 200) {
          return reject(error);
        }
        resolve(JSON.parse(body));
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  requestVols
};
