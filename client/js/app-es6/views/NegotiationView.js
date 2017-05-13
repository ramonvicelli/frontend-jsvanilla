import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegotiationController';

export class NegotiationView {

  constructor() {
    const ID_TABLE = '#negotiations';
    this.table = document.querySelector(ID_TABLE);

    this.table.addEventListener('click', event => {
      if(event.target.nodeName === 'TH'){
        console.log('Add event in table', event.target.textContent.toLowerCase());
      }
    });
  }

  update(negotiation) {
    this.table.tBodies[0].innerHTML += this._newBodyRow(negotiation);
    this._updateFoot(negotiation);
  }

  clean() {
    this.table.tBodies[0].innerHTML = '';
    this.table.tFoot.firstElementChild.lastElementChild.innerHTML = '0';
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
    const tdValue = tr.lastElementChild;
    tdValue.innerHTML = Number(tdValue.innerHTML) + negotiation.volume;
  }
}
