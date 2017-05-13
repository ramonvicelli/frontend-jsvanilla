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

      request.onsuccess = e => resolve(negotiation);

      request.onerror = e => {
        console.log(e.target.error);
        reject(e.target.error.name);
      };
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const cursor = this._connection.transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      const negotiations = [];
      cursor.onsuccess = e => {
        let actual = e.target.result;
        if (actual) {
          const negotiationDB = actual.value;

          negotiations.push(new Negotiation(negotiationDB._date, negotiationDB._amount, negotiationDB._value));
          actual.continue();
        } else {
          resolve(negotiations);
        }
      };

      cursor.onerror = e => {
        console.log(e.target.error);
        reject(e.target.error.name);
      };
    });
  }
}
