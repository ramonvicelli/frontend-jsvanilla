class Negotiation {
  constructor(amount, date, value) {
    this._amount = amount;
    this._date = new Date(date.getTime());
    this._value = value;
    Object.freeze(this);
  }

  get amount() {
    return this._amount;
  }

  get date() {
    return new Date(this._date.getTime());
  }

  get value() {
    return this._value;
  }

  get volume() {
    return this._amount * this._value;
  }
}
