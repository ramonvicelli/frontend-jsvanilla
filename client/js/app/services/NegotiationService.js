class NegotiationService {
  constructor() {
    this._httpService = new HttpService();
  }

  getByWeek() {
    return this._httpService.get('negotiation/week')
      .then(itens => itens.map(item => new Negotiation(new Date(item.date), item.amount, item.value)))
      .catch(error => 'Could not retrieve the negotiatios of the week.');
  }

  getByLastWeek() {
    return this._httpService.get('negotiation/week')
      .then(itens => itens.map(item => new Negotiation(new Date(item.date), item.amount, item.value)))
      .catch(error => 'Could not retrieve the negotiatios of the last week.');
  }

  getByDelayedWeek() {
    return this._httpService.get('negotiation/delayedweek')
      .then(itens => itens.map(item => new Negotiation(new Date(item.date), item.amount, item.value)))
      .catch(error => 'Could not retrieve the negotiatios of the delayed week.');
  }
}
