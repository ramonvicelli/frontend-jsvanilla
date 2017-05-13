class NegotiationDAO {

  constructor(connection) {
    this._connection = connection;
    this._store = 'negotiation';
  }

  add(negotiation) {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negotiation);

      request.onsuccess = e => resolve();

      request.onerror = e => {
        console.log(e.target.error);
        reject(e.target.error.name);
      };
    });
  }
}
