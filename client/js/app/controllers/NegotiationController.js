class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')
  }

  add(event) {
    event.preventDefault();

    const negotiation = new Negotiation(
      treatDate(this._date),
      this._amount.value,
      this._value.value
    );

    console.log(negotiation);

    function treatDate(date) {
      return new Date(date.value.split('-'));
      // return new Date(date.value.replace(/-/g,','));
    }
  }
}
