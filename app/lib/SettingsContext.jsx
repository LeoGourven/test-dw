'use client';

import React, { useState, useContext, createContext, use, useEffect } from 'react';
import { useEditorContext } from './EditorContext';

const SettingsContext = createContext();

export function useSettingsContext() {
    return useContext(SettingsContext);
}

export function SettingsContextProvider({ children }) {
    const { dataset } = useEditorContext();
    const [selectedColumnValues, setSelectedColumnValues] = useState();
    const [selectedColumnLabels, setSelectedColumnLabels] = useState();
    const [areLabelsInside, setAreLabelsInside] = useState(true);

    useEffect(() => {
        const columnsTypes = dataset.columns().map((d) => d.type());
        // selected the first column with numeric values
        const indexNumber = columnsTypes.indexOf('number');
        if (indexNumber > -1) {
            setSelectedColumnValues(dataset.columns()[indexNumber]);
        }

        // selected the first column with text values
        const indexText = columnsTypes.indexOf('text');
        if (indexText > -1) {
            setSelectedColumnLabels(dataset.columns()[indexText]);
        }
    }, [dataset, setSelectedColumnValues, setSelectedColumnLabels]);

    return (
        <SettingsContext.Provider
            value={{
                selectedColumnValues,
                setSelectedColumnValues,
                selectedColumnLabels,
                setSelectedColumnLabels,
                areLabelsInside,
                setAreLabelsInside
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
