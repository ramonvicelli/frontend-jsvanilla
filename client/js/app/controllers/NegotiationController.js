class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')

    this._negotiationsList = this._createNegotiationList();
    this._message = this._createMessage($);
  }

  add(event) {
    event.preventDefault();

    this._negotiationsList.add(this._createNegotiation());
    this._message.text = 'Negotiation saves successfully';
    this._cleanForm();
  }

  clean() {
    this._negotiationsList.removeAll();
    this._message.text = 'Negotiations removes successfuly'
  }

  import () {
    const service = new NegotiationService();

    Promise.all([service.getByWeek(), service.getByLastWeek(), service.getByDelayedWeek()])
      .then(negotiations => {
        negotiations
          .reduce((newList, list) => newList.concat(list), [])
          .forEach(negotiation => this._negotiationsList.add(negotiation));

        this._message.text = 'Negotiations imported successfully.';
      })
      .catch(error => this._message.text = err);
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

  _createNegotiationList() {
    const negotiationView = new NegotiationView();

    return ProxyFactory.create(new NegotiationList(), {
      prop: 'add',
      action: model => negotiationView.update(model)
    }, {
      prop: 'removeAll',
      action: () => negotiationView.clean()
    })
  }

  _createMessage($) {
    return ProxyFactory.create(
      new Message(), {
        prop: 'text',
        action: model => new MessageView($('.message')).update(model)
      }
    );
  }
}
