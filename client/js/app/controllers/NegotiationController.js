class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')

    this._negotiatioView = new NegotiationView();
    this._messageView = new MessageView($('.message'));

    this._negotiationsList = ProxyFactory.create(new NegotiationList(), {
      prop: 'add',
      action: model => this._negotiatioView.update(model)
    }, {
      prop: 'removeAll',
      action: () => this._negotiatioView.clean()
    });

    this._message = ProxyFactory.create(
      new Message(), {
        prop: 'text',
        action: model => this._messageView.update(model)
      }
    );
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();
    this._negotiationsList.add(negotiation);
    this._message.text = 'Negotiation saves successfully';
    this._cleanForm();
  }

  clean() {
    this._negotiationsList.removeAll();

    this._message.text = 'Negotiations removes successfuly'
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
