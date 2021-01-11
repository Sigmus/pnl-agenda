/**
 *  @author     Adam Marchbanks (amarchbanks@deloitte.nl)
 *  @created    April 2020
 */

import { LightningElement, api } from 'lwc';

export default class PnlUiElement extends LightningElement {
    static delegatesFocus = true;

    @api disabled;
    @api artId = ''; // The ard id for provar testing

    disconnectedCallback() {
        if (typeof this.unsubscribe === 'function') {
            this.unsubscribe();
        }
    }
}
