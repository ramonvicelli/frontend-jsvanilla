const dbName = 'frontend-jsvanilla';
const version = 2;
const stores = ['negotiation'];

let close = null;
let connection = null;

export class ConnectionFactory {

  constructor() {
    throw new Error("ConnectionFactory can't be instantiated")
  }

  static getConnection() {
    return new Promise((resolve, reject) => {

      const openRequest = window.indexedDB.open(dbName, version);

      openRequest.onupgradeneeded = e => this._createStore(e.target.result);

      openRequest.onsuccess = e => {
        if (!connection) {
          connection = e.target.result;

          close = connection.close.bind(connection);
          connection.close = function () {
            throw new Error("Close can't be called");
          };
        }
        resolve(connection);
      }

      openRequest.onerror = e => {
        console.log(e.target.error);
        reject(e.target.error.name);
      };
    });
  }

  static closeConnection() {
    if (connection) {
      close();
      connection = null;
    }
  }

  static _createStore(connection) {
    stores.forEach(store => {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }

      connection.createObjectStore(store, {
        autoIncrement: true
      });
    });
  }
}
