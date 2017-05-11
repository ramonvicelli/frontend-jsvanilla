class NegotiationController {

  constructor() {
    const $ = document.querySelector.bind(document);

    // avoid traversing the DOM many times
    this._amount = $('#amount')
    this._date = $('#date')
    this._value = $('#value')

    const self = this;

    this._negotiationsList = new Proxy(new NegotiationList(), {

        get(target, prop, receiver){
          if('add' === prop && typeof target[prop] === typeof Function){
            return function(){
              Reflect.apply(target[prop], target, arguments)
              self._negotiatioView.update(arguments[0]);
            }
          }

          if('removeAll' === prop && typeof target[prop] === typeof Function){
            console.log('entrou213');
            return function(){
              Reflect.apply(target[prop], target, arguments)
              self._negotiatioView.clean();
            }
          }

          return Reflect.get(target, prop, receivers);
        }
    });

    this._negotiatioView = new NegotiationView();
    this._message = new Message();
    this._messageView = new MessageView($('.message'));
  }

  add(event) {
    event.preventDefault();

    const negotiation = this._createNegotiation();
    this._negotiationsList.add(negotiation);

    this._message.text = 'Negotiation saves successfully';
    this._messageView.update(this._message);
    this._cleanForm();
  }

  clean(){
    this._negotiationsList.removeAll();

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
