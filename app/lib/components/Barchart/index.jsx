'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

import { useEditorContext } from '@/app/lib/EditorContext';
import { useSettingsContext } from '../../SettingsContext';

import Line from './Line';

import styles from './BarChart.module.scss';

export const marginBarchart = 10;
export const labelPadding = 10;

const computeLabelSize = (ref, selector) => {
    return Array.from(ref.getElementsByClassName(selector)).map((d) => {
        return d.clientWidth;
    });
};

export default function BarChart() {
    const { selectedColumnValues, selectedColumnLabels, areLabelsInside } = useSettingsContext();
    const { size } = useEditorContext();
    const [valuesWidth, setValuesWidth] = useState(null);
    const [labelsWidth, setLabelsWidth] = useState(null);
    const ref = useRef();

    const measuredRef = useCallback((node) => {
        if (node !== null) {
            ref.current = node;
            setLabelsWidth(computeLabelSize(node, 'bar-label'));
            setValuesWidth(computeLabelSize(node, 'bar-value'));
        }
    }, []);

    const maxLabelWidth = useMemo(() => {
        if (!labelsWidth) return 0;
        return max(labelsWidth);
    }, [labelsWidth]);

    const data = useMemo(() => {
        if (!selectedColumnValues) return [];
        const labels = selectedColumnLabels.values();
        return selectedColumnValues.values().map((d, index) => {
            return {
                label: labels[index],
                value: d
            };
        }).sort((a, b) => b.value - a.value);
    }, [selectedColumnValues, selectedColumnLabels]);

    const chartProperties = useMemo(() => {
        const hasNegativesValues = data.some((d) => d.value < 0);
        const barMaxSize = size[0] - maxLabelWidth - marginBarchart;
        const maxValueIndex = data.findIndex(
            (d) => d.value === max(data, (d) => Math.abs(d.value))
        );
        let maxAvailableWidth = barMaxSize;
        let zeroLine = 0;

        // @todo The split between negative and positive values should be calculated based
        // max distance from zero, not the min/max value
        if (hasNegativesValues) {
            zeroLine = maxAvailableWidth / 2;
            maxAvailableWidth = maxAvailableWidth - zeroLine;
        }

        if (!areLabelsInside) {
            maxAvailableWidth =
                maxAvailableWidth - valuesWidth[maxValueIndex] - labelPadding;
        }

        return {
            width: scaleLinear()
                .domain([0, max(data, (d) => Math.abs(d.value))])
                .range([0, maxAvailableWidth]),
            zeroLine
        };
    }, [data, size, maxLabelWidth, areLabelsInside, valuesWidth]);

    if (!selectedColumnValues) {
        return <div>No data to display</div>;
    }

    return (
        <div className={styles.chart} ref={measuredRef}>
            {data.map((d) => {
                const barWidth = chartProperties.width(Math.abs(d.value));
                const x =
                    d.value < 0 ? chartProperties.zeroLine - barWidth : chartProperties.zeroLine;
                return (
                    <Line
                        key={d.value + d.label}
                        maxLabelWidth={maxLabelWidth}
                        item={d}
                        offset={x}
                        barWidth={barWidth}
                        areLabelsInside={areLabelsInside}
                        zeroLine={chartProperties.zeroLine}
                    />
                );
            })}
        </div>
    );
}
