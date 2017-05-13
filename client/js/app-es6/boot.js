import {} from './polyfill/fetch';
import {currrentInstance} from './controllers/NegotiationController';

const negotiationCtrl =  currrentInstance();

document.querySelector('.form').onsubmit = negotiationCtrl.add.bind(negotiationCtrl);
document.querySelector('.clean').onclick = negotiationCtrl.clean.bind(negotiationCtrl);
document.querySelector('.import').onclick = negotiationCtrl.import.bind(negotiationCtrl);
