const DataStore = require("nedb");
const path = require("path");
const { isExist, _insert, _find } = require("./utils");

const single = new DataStore({
  filename: path.join(__dirname, "../../db/single"),
  autoload: true
});

async function addSingle(data) {
  if (await isExist({ date: data.date }, single)) {
    throw new Error(`Add single failed for single${data.date} already exist`);
  }

  const newDoc = await _insert(data, single);
  console.log(`Add success: single${data.date}`.green);
  return newDoc;
}

async function getSingleList() {
  return await _find({}, single, { date: -1 });
}

async function getLatestSingle() {
  const singles = await _find({}, single, { date: -1 });
  return singles.length > 0
    ? (await _find({}, single, { date: -1 }))[0].date
    : 0;
}

module.exports = {
  single: {
    add: addSingle,
    get: getSingleList,
    latest: getLatestSingle,
    isExist: async date => await isExist({ date }, single)
  }
};
