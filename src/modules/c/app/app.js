import { LightningElement } from 'lwc';

import w51 from './w51.json';
import w52 from './w52.json';

export default class App extends LightningElement {
    agendaTestCounter = 0;

    connectedCallback() {}

    renderedCallback() {}

    agendaItemClick(ev) {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(ev.detail, null, 4));
    }

    get agendaItems() {
        if (this.agendaTestCounter === 1) {
            return w52;
        }
        return w51;
    }

    agendaWeekClick(ev) {
        console.log(ev.detail);

        if (this.agendaTestCounter === 0) {
            this.agendaTestCounter = 1;
        } else {
            this.agendaTestCounter = 0;
        }
    }

    get hidePreviousAgenda() {
        return false;
    }

    get hideNextAgenda() {
        return false;
    }
}
