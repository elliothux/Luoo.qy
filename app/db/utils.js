async function isExist(arg, db) {
  const doc = await _find(arg, db);
  return doc.length > 0;
}

async function remove(arg, db) {
  if (!(await isExist(arg, db))) return;
  await _remove(arg, db);
  console.log(`Delete success: ${arg}`.red);
}

function _insert(arg, db) {
  if (!arg || typeof arg !== 'object') {
    throw new Error(
      `Function 'insert' except an object not ${typeof arg} as the first argument.`,
    );
  }
  return new Promise((resolve, reject) => {
    db.insert(arg, (error, doc) => {
      error && reject(`An error happened whiling handling insert: ${error}`);
      resolve(doc);
    });
  });
}

function _find(arg = {}, db, sort, limit) {
  return new Promise((resolve, reject) => {
    let exec = db.find(arg);
    if (sort) {
      exec = exec.sort(sort);
    }
    if (limit) {
      exec = exec.limit(limit);
    }
    exec.exec((error, docs) => {
      if (error) {
        reject(`An error happened whiling handling find: ${error}`);
      }
      resolve(docs);
    });
  });
}

function _update(arg, newArg, db) {
  (!arg || typeof arg !== 'object') && (arg = {});
  return new Promise((resolve, reject) => {
    db.update(arg, { $set: newArg }, {}, (error, numReplaced) => {
      error && reject(`An error happened whiling handling find: ${error}`);
      resolve(numReplaced);
    });
  });
}

function _remove(arg, db) {
  if (!arg || typeof arg !== 'object') {
    throw new Error(
      `Function 'insert' except an object not ${typeof arg} as the first argument.`,
    );
  }
  return new Promise((resolve, reject) => {
    db.remove(arg, {}, (error) => {
      error && reject(`An error happened while handling remove: ${error}`);
      resolve();
    });
  });
}

module.exports = {
  _insert,
  _find,
  isExist,
  remove,
};
