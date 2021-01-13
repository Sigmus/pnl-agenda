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
            return JSON.parse('[{"date":"2020-12-14","items":[{"id":"e76994a2-7993-46e9-a0bc-6d065e46bf5d","hour":9,"minute":45,"duration":120,"text":"a"},{"id":"841a6f65-b471-470e-8220-083baebabacd","hour":9,"minute":45,"duration":150,"text":"b","recurring":true}]},{"date":"2020-12-15","items":[]},{"date":"2020-12-16","items":[{"id":"b4f165eb-327e-4204-95fa-f5ab81d4ca45","hour":8,"minute":45,"duration":135,"text":"c","recurring":true}]},{"date":"2020-12-17","items":[]},{"date":"2020-12-18","items":[{"id":"e59e5b12-40c4-42e7-9161-f0c37a2d338b","hour":10,"minute":45,"duration":90,"text":"d","recurring":true,"color":"#009537"},{"id":"9f0d0142-19fb-4a0d-ac06-a294d76cc90b","hour":11,"minute":30,"duration":30,"text":"e"}]},{"date":"2020-12-19","items":[]},{"date":"2020-12-20","items":[]}]');
        }
        return JSON.parse('[{"date":"2020-12-07","items":[{"id":"96d3b66f-c997-4ca3-b697-7d0eae62bdd3","hour":6,"minute":0,"duration":60,"text":"a"},{"id":"d9140299-ab74-4bac-87e4-ed9b38dd00ee","hour":6,"minute":30,"duration":60,"text":"b","recurring":true},{"id":"202d8e41-dcd8-4b6c-9901-a520bd78ab45","hour":8,"minute":0,"duration":30,"text":"c"},{"id":"b974c871-c73b-462e-b1c7-ba30b9bf18a6","hour":10,"minute":15,"duration":120,"text":"d"},{"id":"51aee01e-facf-45ab-8a07-c7c6874802e2","hour":12,"minute":15,"duration":90,"text":"f","recurring":true},{"id":"38678c1d-b0dd-418d-ac11-aa09e3963fa3","hour":12,"minute":0,"duration":90,"text":"g"}]},{"date":"2020-12-08","items":[]},{"date":"2020-12-09","items":[{"id":"b4f165eb-327e-4204-95fa-f5ab81d4ca45","hour":8,"minute":45,"duration":135,"text":"h","recurring":true}]},{"date":"2020-12-10","items":[{"id":"7c5cbcd6-9657-4daa-aecf-b4e6e896e5f8","hour":7,"minute":45,"duration":40,"text":"i"},{"id":"afe5723e-5c5e-4cfa-b495-e8048ff23eb0","hour":13,"minute":0,"duration":45,"text":"j"},{"id":"02e69cf4-7d6c-405c-b5db-02afb8de257d","hour":13,"minute":0,"duration":60,"text":"k"}]},{"date":"2020-12-11","items":[{"id":"db2db8a2-566a-4411-90c0-a99a148d310c","hour":19,"minute":30,"duration":30,"text":"l"}]},{"date":"2020-12-12","items":[{"id":"264f7daa-3939-4703-9670-fd09aca7a1da","hour":9,"minute":30,"duration":300,"text":"m","color":"#009537"}]},{"date":"2020-12-13","items":[]}]');
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
