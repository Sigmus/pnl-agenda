import { api } from 'lwc';
import PnlUiElement from 'c/pnlUiElement';

export default class PnlUiAgendaItem extends PnlUiElement {
    @api item;

    itemClick() {
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                bubbles: true,
                composed: true,
                detail: this.item
            })
        );
    }

    get cssClass() {
        return `item ${this.item.colTotal > 1 ? 'small' : ''}`;
    }
}
