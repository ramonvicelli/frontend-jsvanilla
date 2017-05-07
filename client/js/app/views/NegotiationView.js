class NegotiationView {


  constructor(){
    this._idTable = '#negotiations';

  }

  update(negotiation) {
    document.querySelector(`${this._idTable} tbody`)
      .innerHTML += this._newRow(negotiation);
  }

  _newRow(negotiation){
    return `
      <tr>
        <td>${DateHelper.dateToString(negotiation.date)}</td>
        <td>${negotiation.amount}</td>
        <td>${negotiation.value}</td>
        <td>${negotiation.volume}</td>
      </tr>
    `;
  }

}
