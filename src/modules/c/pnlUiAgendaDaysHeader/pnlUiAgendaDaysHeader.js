import { api } from 'lwc';
import PnlUiElement from 'c/pnlUiElement';

export const daysLabels = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

export default class PnlUiAgendaDaysHeader extends PnlUiElement {
    @api items = [];
    @api itemWidth;

    connectedCallback() {
        const today = new Date();

        this._today = `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    }

    get days() {
        return this.items.map((i) => {
            const date = new Date(i.date);
            const weekDayNumber = date.getDay();
            const monthDayNumber = date.getDate();

            return {
                text: `${
                    daysLabels[weekDayNumber]
                } ${monthDayNumber.toString().padStart(2, '0')}`,
                cssClass: `${this._today === i.date ? 'active' : ''}`,
                style: `width:${this.itemWidth + 1}px`
            };
        });
    }
}
