class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')

    this._negotiationsList = new NegotiationList();
    this._negotiatioView = new NegotiationView();
    this._message = new Message();
    this._messageView = new MessageView($('.message'));
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();

    this._negotiationsList.add(negotiation);
    this._negotiatioView.update(negotiation)
    this._message.text = 'Negotiation saves successfully';
    this._messageView.update(this._message);
    this._cleanForm();
  }

  clean(){
    this._negotiationsList.removeAll();
    this._negotiatioView.clean();

    this._message.text = 'Negotiations removes successfuly'
    this._messageView.update(this._message);
  }

  _cleanForm() {
    this._amount.value = 1;
    this._date.value = '';
    this._value.value = 0.0

    this._date.focus();
  }

  _createNegotiation() {
    return new Negotiation(
      DateHelper.stringToDate(this._date.value),
      this._amount.value,
      this._value.value
    );
  }
}
