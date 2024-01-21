'use client';

import { useRef } from 'react';
import { createRoot } from 'react-dom/client';

import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';

import ColumnTypeSelect from './ColumnTypeSelect';

import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import Dataset from '@/app/lib/datawrapper/chart-core/lib/dw/dataset/index.js';
import Column from '@/app/lib/datawrapper/chart-core/lib/dw/dataset/column';
import { useEditorContext } from '@/app/lib/EditorContext';

import 'handsontable/dist/handsontable.full.css';

registerAllModules();

const initialColumns = 8;
const initialRows = 20;
const initialData = Array.from({ length: initialRows }, () => new Array(initialColumns).fill(''));

const customColumnTypes = {};
let autoColumnTypes = {};

export default function DataTable() {
    let { dataset, setDataset } = useEditorContext();
    const hotTableRef = useRef();

    function handleDataChange(changes, source) {
        if (['updateData'].includes(source)) return;

        const hot = hotTableRef?.current?.hotInstance;
        if (!hot) return;

        dataset = parseData(hot.getData());

        // in case any headers were renamed to prevent duplicates,
        // update data in table to reflect it
        dataset.columns().forEach((col, i) => {
            const colName = col.name();
            const cellValue = hot.getDataAtCell(0, i);
            if (colName !== cellValue) {
                hot.setDataAtCell(0, i, colName);
            }
        });

        autoColumnTypes = Object.fromEntries(
            dataset.columns().map((col) => [col.name(), col.type()])
        );

        hot.render();
        setDataset(dataset);
    }

    let dropdownElement;
    let dropdownRoot;

    if (typeof document !== 'undefined') {
        dropdownElement = document.createElement('div');
        dropdownRoot = createRoot(dropdownElement);
    }

    function dropdownRenderer(dropdownElement) {
        const hot = hotTableRef?.current?.hotInstance;
        if (!hot) return dropdownElement;
        const colIndex = hot.getSelectedRange()?.[0].to.col || 0;
        const column = dataset.columns()[colIndex];
        const colName = column && column.name();
        const isAutoType = column && !customColumnTypes[colName];

        // Mount the React component inside the container
        dropdownRoot.render(
            <ColumnTypeSelect
                initialValue={isAutoType || !column ? 'auto' : column.type()}
                autoType={!column ? 'text' : autoColumnTypes[colName]}
                disabled={!column}
                onChange={(newValue) => {
                    // Handle value change
                    customColumnTypes[colName] = newValue;
                    dataset.column(colName).type(newValue);
                    hot.render();
                    setDataset(dataset);
                }}
            />
        );
        return dropdownElement;
    }

    return (
        <>
            <h3 className="title is-5">Data</h3>
            <div className="table-container">
                <HotTable
                    ref={hotTableRef}
                    data={initialData}
                    startCols={initialColumns}
                    startRows={initialRows}
                    height="auto"
                    width="100%"
                    stretchH="all"
                    colHeaders={(i) => String(i + 1)}
                    contextMenu={true}
                    rowHeaders={true}
                    manualRowMove={true}
                    afterChange={handleDataChange}
                    dropdownMenu={{
                        items: {
                            col_left: {},
                            col_right: {},
                            sp1: { name: '---------' },
                            remove_col: {},
                            clear_column: {},
                            sp2: { name: '---------' },
                            ...(dropdownElement
                                ? {
                                      column_type_select: {
                                          isCommand: false,
                                          renderer: () => dropdownRenderer(dropdownElement)
                                      }
                                  }
                                : {})
                        }
                    }}
                    cells={(row, col) => {
                        const cellProperties = {};
                        const classes = [];

                        // style first row as header
                        if (row === 0) classes.push('first-row');

                        if (!dataset || col > dataset.columns().length - 1) {
                            return { className: classes.join(' ') };
                        }

                        const datasetCol = dataset.columns()[col];
                        const columnType = datasetCol.type();

                        // check if cell value is valid
                        if (row && ['number', 'date'].includes(columnType)) {
                            const cellValue = datasetCol.values()[row - 1];
                            const isValid =
                                !cellValue ||
                                (columnType === 'date' ? isDate(cellValue) : isNumber(cellValue));
                            if (!isValid) classes.push('invalid');
                        }
                        classes.push(`type-${datasetCol.type()}`);
                        cellProperties.className = classes.join(' ');
                        return cellProperties;
                    }}
                    licenseKey="non-commercial-and-evaluation"
                ></HotTable>
            </div>
        </>
    );
}

/**
 *
 * Takes an array of dataset row value, trims off any trailing empty rows or columns,
 * and parses and returns as Datawrapper Dataset object
 *
 * @param {string[][]} data
 * @returns {Dataset}
 *
 */
function parseData(data = []) {
    const totalColumns = data[0]?.length ?? 0;
    const totalRows = data.length;

    // figure out how many columns contain data
    const firstNonEmptyCellPerRow = data.map((row) => {
        const firstNonEmptyCellFromRight = findIndexReverse(row, (cell) => !!cell);
        return firstNonEmptyCellFromRight > -1 ? totalColumns - firstNonEmptyCellFromRight : 0;
    });

    const columnCount = Math.max(...firstNonEmptyCellPerRow);

    // no columns, return empty dataset
    if (!columnCount) return Dataset([]);

    // figure out how many rows contain data
    const rowCount = totalRows - findIndexReverse(firstNonEmptyCellPerRow, (v) => v > 0);

    // transpose and trim input data
    const dataAsColumns = data.slice(0, rowCount).reduce((columns, row) => {
        row.slice(0, columnCount).forEach((item, index) => {
            columns[index] = columns[index] || [];
            columns[index].push(item);
        });
        return columns;
    }, []);

    // build Datawrapper Dataset object from columns
    const dataset = Dataset(dataAsColumns.map((column) => new Column(column[0], column.slice(1))));

    return dataset;
}

function findIndexReverse(arr, test) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (test(arr[i])) return arr.length - 1 - i;
    }
    return -1;
}
