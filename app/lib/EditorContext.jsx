'use client';

import React, { useState, useContext, createContext } from 'react';
import Dataset from '@/app/lib/datawrapper/chart-core/lib/dw/dataset';

const EditorContext = createContext();

export function useEditorContext() {
    return useContext(EditorContext);
}

export function EditorContextProvider({ children }) {
    const [size, setSize] = useState([600, 400]);
    const [dataset, setDataset] = useState(Dataset([]));

    return (
        <EditorContext.Provider value={{ size, setSize, dataset, setDataset }}>
            {children}
        </EditorContext.Provider>
    );
}
