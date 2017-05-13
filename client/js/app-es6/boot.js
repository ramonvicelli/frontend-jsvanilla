import {} from './polyfill/fetch';
import {NegotiationController} from './controllers/NegotiationController';

const negotiationCtrl = new NegotiationController();

document.querySelector('.form').onsubmit = negotiationCtrl.adiciona.bind(negotiationCtrl);
document.querySelector('.clean').onclick = negotiationCtrl.clean.bind(negotiationCtrl);
document.querySelector('.import').onclick = negotiationCtrl.import.bind(negotiationCtrl);
