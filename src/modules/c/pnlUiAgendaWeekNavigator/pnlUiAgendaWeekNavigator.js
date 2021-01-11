import { api } from 'lwc';
import PnlUiElement from 'c/pnlUiElement';

export const monthsLabels = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'December'
];

// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
export function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

export default class PnlUiAgendaWeekNavigator extends PnlUiElement {
    @api items = [];
    @api hideNext;
    @api hidePrevious;

    get text() {
        const minDate = this.minDate();
        const maxDate = this.maxDate();

        const snippet = `, week ${getWeekNumber(minDate)[1]}`;

        if (minDate.getMonth() === maxDate.getMonth()) {
            return `${minDate.getDate()} - ${maxDate.getDate()} ${
                monthsLabels[minDate.getMonth()]
            } ${snippet}
            `;
        }

        return `${minDate.getDate()} ${
            monthsLabels[minDate.getMonth()]
        } - ${maxDate.getDate()} ${
            monthsLabels[maxDate.getMonth()]
        } ${snippet}`;
    }

    goNext() {
        // Assume maxDate is a Sunday, get the next day (Monday)
        const nextDate = new Date(this.maxDate());
        nextDate.setDate(nextDate.getDate() + 1);

        this.weekClick(nextDate);
    }

    goPrevious() {
        // Assume minDate is a Monday, get previous week's Monday
        const previousDate = new Date(this.minDate());
        previousDate.setDate(previousDate.getDate() - 7);

        this.weekClick(previousDate);
    }

    weekClick(detail) {
        this.dispatchEvent(
            new CustomEvent('weekclick', {
                composed: true,
                bubbles: true,
                detail
            })
        );
    }

    minDate() {
        // Assume first item is a Monday
        return new Date(this.items[0].date);
    }

    maxDate() {
        // Assume last item is a Sunday
        return new Date(this.items[this.items.length - 1].date);
    }
}
