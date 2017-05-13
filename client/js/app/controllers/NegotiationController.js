class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')

    this._negotiationsList = this._createNegotiationList();
    this._message = this._createMessage($);

    this._getDAO()
      .then(dao => dao.findAll())
      .then(negotiations => negotiations.forEach(negotiation => this._negotiationsList.add(negotiation)))
      .catch(error => this._message.text = error);
  }

  add(event) {
    event.preventDefault();

    this._getDAO()
      .then(dao => dao.add(this._createNegotiation()))
      .then(negotiation => {
        this._negotiationsList.add(negotiation);
        this._message.text = 'Negotiation saves successfully';
        this._cleanForm();;
      })
      .catch(error => this._message.text = error);
  }

  clean() {
    this._getDAO()
      .then(dao => dao.deleteAll())
      .then(message => {
        this._negotiationsList.removeAll();
        this._message.text = message;
      })
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
      new Number(this._amount.value),
      new Number(this._value.value)
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

  _getDAO() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection));
  }
}
