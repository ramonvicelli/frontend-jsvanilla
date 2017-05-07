class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')
    this._negotiationsList = new NegotiationList();
  }

  add(event) {
    event.preventDefault();

    const negotiation = new Negotiation(
      DateHelper.stringToDate(this._date.value),
      this._amount.value,
      this._value.value
    );

    this._negotiationsList.add(negotiation);
    this._cleanForm();
  }

  _cleanForm(){
    this._amount.value = 1;
    this._date.value = '';
    this._value.value = 0.0

    this._amount.focus();
  }
}
