'use client';

import React, { useState, useEffect } from 'react';
import { useEditorContext } from '@/app/lib/EditorContext';

export default function VisPreview({ children }) {
    const { size, setSize } = useEditorContext();
    const [resizing, setResizing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [startSize, setStartSize] = useState(size);

    const handleResizerMouseDown = (e) => {
        setStartX(e.clientX);
        setStartY(e.clientY);
        setStartSize(size);
        setResizing(true);
    };

    const handleMouseMove = (e) => {
        if (!resizing) return;
        setSize([
            Math.max(100, startSize[0] + e.clientX - startX),
            Math.max(100, startSize[1] + e.clientY - startY)
        ]);
    };

    const handleMouseUp = () => {
        setResizing(false);
    };

    // Adding event listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    });

    return (
        <div className="preview p-4" style={{ width: `${size[0]}px`, height: `${size[1]}px` }}>
            <div className="chart-container">{children}</div>

            <div
                tabIndex={-1}
                role="button"
                onMouseDown={handleResizerMouseDown}
                className="resizer"
            ></div>
        </div>
    );
}
