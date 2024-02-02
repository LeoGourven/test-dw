import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';

import styles from './BarChart.module.scss';

import { labelPadding } from './index';

const Value = ({ label, barWidth, alignLeft, areLabelsInside, zeroLine }) => {
    const ref = useRef();
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current.clientWidth);
    }, [barWidth]);

    const hasEnoughtSpace = useMemo(() => {
        if (!width) return true;
        return width + labelPadding <= barWidth;
    }, [width, barWidth]);

    const offsetX = useMemo(() => {
        // Display outside the bar
        if (!areLabelsInside || !hasEnoughtSpace) {
            if (alignLeft) {
                return barWidth + labelPadding;
            } else {
                return -barWidth - width - labelPadding;
            }
            // display inside the bar
        } else {
            if (alignLeft) {
                return labelPadding;
            } else {
                return -width - labelPadding;
            }
        }
    }, [hasEnoughtSpace, barWidth, areLabelsInside, alignLeft, width]);

    return (
        <div
            ref={ref}
            className={`bar-value ${styles.label}`}
            style={{ transform: `translateX(${zeroLine + offsetX}px)` }}
        >
            {label}
        </div>
    );
};

export default Value;
