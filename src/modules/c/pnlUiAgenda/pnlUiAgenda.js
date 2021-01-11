import { api } from 'lwc';
import PnlUiElement from 'c/pnlUiElement';
import calculatePositions, { range } from './calculatePositions';

// https://gist.github.com/peduarte/969217eac456538789e8fac8f45143b4
export function throttle(func, wait = 100) {
    let timer = null;
    return function (...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}

export default class PnlUiAgenda extends PnlUiElement {
    @api items = [];
    @api timeSlots; // Optional, creates a fixed height scrollable agenda

    @api startHour; // startHour and endHour are optional
    @api endHour; // they force a specific hour range

    @api hideNext; // Optional
    @api hidePrevious; // Optional

    _positionedItems = [];
    leftOffset;
    itemHeight = 10;

    connectedCallback() {
        this.resizeHandler = throttle(() => {
            this.calculateWidthAndPositions();
        }, 150);

        window.addEventListener('resize', this.resizeHandler);

        setTimeout(() => {
            // Do not remove this setTimeout:
            // or :host min-width doesn't work on smartphones
            this.calculateWidthAndPositions();
            this.hasConnected = true;
        }, 1);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    calculateWidthAndPositions() {
        this.leftOffset =
            this.template.querySelector('.hours').clientWidth +
            this.items.length;

        this._itemWidth = Math.floor(
            (this.template.host.clientWidth - this.leftOffset) /
                this.items.length
        );

        this._positionedItems = this.items.map((i, index) => {
            return {
                index,
                ...i,
                items: calculatePositions({
                    itemWidth: this._itemWidth,
                    itemHeight: this.itemHeight,
                    items: i.items,
                    startHour: this._startHour
                })
            };
        });
    }

    get positionedItems() {
        if (this.hasConnected) {
            this.calculateWidthAndPositions();
        }

        return this._positionedItems;
    }

    get hours() {
        this._startHour = this.startHour
            ? parseInt(this.startHour, 10)
            : Math.min(
                  ...this.items.map((i) =>
                      Math.min(...i.items.map((y) => y.hour))
                  )
              );

        this._endHour = this.endHour
            ? parseInt(this.endHour, 10)
            : this.items.reduce((endHour, i) => {
                  i.items.forEach((y) => {
                      const newEndHour = Math.ceil(
                          y.hour + (y.duration - y.minute) / 60
                      );

                      if (newEndHour > endHour) {
                          endHour = newEndHour;
                      }
                  });

                  return endHour;
              }, 0);

        return range(this._startHour, this._endHour).map((i) => {
            return {
                text: `${i.toString().padStart(2, '0')}:00`,
                style: `width:${this._itemWidth}px`
            };
        });
    }

    get wrapperStyle() {
        return `height:${
            this.timeSlots
                ? `${this.timeSlots * this.itemHeight * 4 + this.itemHeight}px`
                : 'auto'
        }`;
    }

    get itemWidth() {
        return this._itemWidth;
    }
}
