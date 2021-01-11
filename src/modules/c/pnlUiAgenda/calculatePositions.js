export const range = (from, to, step = 1) =>
    [...Array(Math.floor((to - from) / step) + 1)].map(
        (_, i) => from + i * step
    );

export default function (props) {
    let items = [];

    createItemsWithRowsAndCols();

    calculatePositions();

    return items;

    function createItemsWithRowsAndCols() {
        injectRowInfo().forEach((item) => {
            const rowItems = getItemsInRowRange(item.rowStart, item.rowEnd);

            if (!rowItems.length) {
                items.push({
                    ...item,
                    colStart: 0,
                    colEnd: 1,
                    colTotal: 1
                });
                return;
            }

            const maxColEnd = getMaxProp(rowItems, 'colEnd');
            let newColEnd = maxColEnd;

            const maxColTotal = getMaxProp(rowItems, 'colTotal');
            let newColTotal = maxColTotal;

            if (maxColTotal > maxColEnd) {
                newColEnd = maxColTotal - maxColEnd + 1;
            } else {
                newColTotal++;
                newColEnd++;
            }

            rowItems.forEach((_i) => {
                _i.colTotal = newColTotal;
            });

            items.push({
                ...item,
                colStart: maxColEnd,
                colEnd: newColEnd,
                colTotal: newColTotal
            });
        });
    }

    function injectRowInfo() {
        return props.items.map((i) => {
            const rowStart = (i.hour - props.startHour) * 4 + i.minute / 15;
            const rowEnd = rowStart + i.duration / 15;

            return { rowStart, rowEnd, range: range(rowStart, rowEnd), ...i };
        });
    }

    function getItemsInRowRange(rowStart, rowEnd) {
        return items.filter((i) => {
            return i.range.includes(rowStart) || i.range.includes(rowEnd);
        });
    }

    function getMaxProp(_items, propName) {
        return Math.max(..._items.map((i) => i[propName]));
    }

    function calculatePositions() {
        items.forEach((i, index) => {
            i.key = index;
            i.top = i.rowStart * props.itemHeight;
            i.height = (i.rowEnd - i.rowStart) * props.itemHeight;

            const widthUnit = props.itemWidth / i.colTotal;
            i.width = (i.colEnd - i.colStart) * widthUnit;
            i.left = i.colStart * widthUnit;

            i.style = `
                width: ${i.width}px;
                height: ${i.height}px;
                left: ${i.left}px;
                top: ${i.top}px;
            `;

            if (i.color) {
                i.style += `border-color: ${i.color}`;
            }
        });
    }
}
