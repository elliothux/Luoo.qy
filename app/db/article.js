const DataStore = require("nedb");
const path = require("path");
const { isExist, _insert, _find } = require('./utils');


const article = new DataStore({
  filename: path.join(__dirname, "../db/article"),
  autoload: true
});

const articleTrack = new DataStore({
  filename: path.join(__dirname, "../db/articleTrack"),
  autoload: true
});

async function addArticle(data) {
  if (await isExist({ id: data.id }, article)) {
    throw new Error(`Add article failed for article ${data.id} already existing`);
  }

  const newDoc = await _insert(data, article);
  console.log(`Add success: article ${data.id}`.green);
  return newDoc;
}

async function getArticleList(id) {
  const options = id ? { id } : {};
  const result = await _find(options, article, { id: -1 });
  return id ? result[0] : result;
}

async function getLatestArticleId() {
  const articles = await _find({}, article, { id: -1 });
  return articles.length > 0 ? articles[0].id : 0;
}

async function addArticleTrack(data) {
  if (await isExist({ articleId: data.articleId, id: data.id }, articleTrack)) {
    throw new Error(
      `Add article failed for track${data.id} already existing`
    );
  }

  const newDoc = await _insert(data, articleTrack);
  console.log(`Add success: articleTrack${data.id}`.green);
  return newDoc;
}

async function getArticleTrackList() {
  return await _find({}, articleTrack, { track_id: -1 });
}


module.exports = {
  article: {
    add: addArticle,
    get: getArticleList,
    latest: getLatestArticleId,
    isExist: async articleId => await isExist({ id: articleId }, article)
  },
  articleTrack: {
    add: addArticleTrack(),
    get: getArticleTrackList,
    isExist: async trackId => await isExist({ id: trackId }, articleTrack)
  },
};
