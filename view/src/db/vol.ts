import PouchDB from 'pouchdb';


const db = new PouchDB('vols');

db.info().then(function (info) {
    console.log(info);
});
