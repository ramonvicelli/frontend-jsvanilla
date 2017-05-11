class NegotiationList {

  constructor(fnUpdateView, fnCleanView) {
    this._negotiations = [];
    this._fnUpdateView = fnUpdateView;
    this._fnCleanView = fnCleanView;
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
    this._fnUpdateView(negotiation);
  }

  get negotiations() {
    return [].concat(this._negotiations);
  }

  removeAll() {
    this._negotiations = [];
    this._fnCleanView();
  }
}
