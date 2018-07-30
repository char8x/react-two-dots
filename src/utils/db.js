if ('indexedDB' in window === false) {
  window.indexedDB =
    window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
}
const DB_NAME = 'react-two-dots';
const DB_VERSION = 1;
const DB_STORE = 'music';

function getDBAsync(dbName, dbVersion, dbStore) {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(dbName, dbVersion);
    req.onsuccess = function(evt) {
      const db = req.result;
      if (db.objectStoreNames.length === 0) {
        db.close();
      } else {
        resolve(db);
      }
    };
    req.onerror = function(evt) {
      reject(req.error);
    };
    req.onupgradeneeded = function(evt) {
      const db = evt.target.result;
      db.createObjectStore(dbStore);
    };
  });
}

function getDataAsync(key) {
  return getDBAsync(DB_NAME, DB_VERSION, DB_STORE).then(
    db => {
      return new Promise((resolve, reject) => {
        const objectStore = db.transaction(DB_STORE).objectStore(DB_STORE);
        const req = objectStore.get(key);
        req.onsuccess = function() {
          resolve(req.result);
          db.close();
        };
        req.onerror = function() {
          reject(req.error);
        };
      });
    },
    error => {
      console.error(error);
    }
  );
}

function setDataAsync(key, val) {
  return getDBAsync(DB_NAME, DB_VERSION, DB_STORE).then(
    db => {
      return new Promise((resolve, reject) => {
        const objectStore = db
          .transaction(DB_STORE, 'readwrite')
          .objectStore(DB_STORE);
        const req = objectStore.add(val, key);
        req.onsuccess = function() {
          resolve(req.result);
          db.close();
        };
        req.onerror = function() {
          reject(req.error);
        };
      });
    },
    error => {
      console.error(error);
    }
  );
}

export { getDataAsync, setDataAsync };
