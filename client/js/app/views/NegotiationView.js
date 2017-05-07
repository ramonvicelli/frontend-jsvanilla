class NegotiationView {


  constructor() {
    const ID_TABLE = '#negotiations';
    this.table = document.querySelector(ID_TABLE);
  }

  update(negotiation) {
    this.table.tBodies[0].innerHTML += this._newBodyRow(negotiation);
    this._updateFoot(negotiation);
  }

  _newBodyRow(negotiation) {
    return `<tr>
        <td>${DateHelper.dateToString(negotiation.date)}</td>
        <td>${negotiation.amount}</td>
        <td>${negotiation.value}</td>
        <td>${negotiation.volume}</td>
      </tr>`;
  }

  _updateFoot(negotiation) {
    const tr = this.table.tFoot.firstElementChild;
    console.log(tr);
    const tdValue = tr.lastElementChild;
    console.log(tdValue);
    tdValue.innerHTML = Number(tdValue.innerHTML) + negotiation.volume;
  }
}