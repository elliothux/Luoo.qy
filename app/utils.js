const request = require('request');


function requestVols(from, to) {
  return new Promise((resolve, reject) => {
    const URL = `http://127.0.0.1:8087/api/vols/${from}/${to}`;
    request.get(URL, (error, response, body) => {
      if (error || !response || response.statusCode !== 200) {
        return reject(error);
      }
      resolve(body);
    });
  });
}


module.exports = {
  requestVols
};
