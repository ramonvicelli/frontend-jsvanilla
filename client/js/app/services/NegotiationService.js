class NegotiationService {
  constructor() {
    this._httpService = new HttpService();
  }

  add(negotiation) {
    return this._getDAO().then(dao => dao.add(negotiation));
  }

  deleteAll() {
    return this._getDAO().then(dao => dao.deleteAll());
  }

  findAll() {
    return this._getDAO().then(dao => dao.findAll());
  }

  get() {
    return Promise.all([this._getByWeek(), this._getByLastWeek(), this._getByDelayedWeek()])
      .then(negotiations => negotiations.reduce((newList, list) => newList.concat(list), []));
  }

  import (currentNegotiationList) {
    return this.get()
      .then(negotiations =>
        negotiations.filter(negotiation =>
          !currentNegotiationList.some(existingNegotiation => JSON.stringify(existingNegotiation) === JSON.stringify(negotiation))))
  }

  _getByWeek() {
    return this._httpService.get('negotiation/week')
      .then(itens => itens.map(item => new Negotiation(new Date(item.date), item.amount, item.value)))
      .catch(error => 'Could not retrieve the negotiatios of the week.');
  }

  _getByLastWeek() {
    return this._httpService.get('negotiation/week')
      .then(itens => itens.map(item => new Negotiation(new Date(item.date), item.amount, item.value)))
      .catch(error => 'Could not retrieve the negotiatios of the last week.');
  }

  _getByDelayedWeek() {
    return this._httpService.get('negotiation/delayedweek')
      .then(itens => itens.map(item => new Negotiation(new Date(item.date), item.amount, item.value)))
      .catch(error => 'Could not retrieve the negotiatios of the delayed week.');
  }

  _getDAO() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegotiationDAO(connection));
  }
}
