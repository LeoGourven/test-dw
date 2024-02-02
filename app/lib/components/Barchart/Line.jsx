import Value from './Value';

import styles from './BarChart.module.scss';
import { marginBarchart } from './index';

const Line = ({ maxLabelWidth, item, offset, barWidth, areLabelsInside, zeroLine }) => {
    return (
        <div className={styles.line}>
            <div className={`bar-label`} style={{ minWidth: `${maxLabelWidth}px` }}>
                {item.label}
            </div>

            <div className={styles.barContainer}>
                <div
                    className={styles.bar}
                    style={{
                        left: `${offset + marginBarchart}px`,
                        width: `${barWidth}px`
                    }}
                ></div>
                <Value
                    label={item.value}
                    barWidth={barWidth}
                    areLabelsInside={areLabelsInside}
                    zeroLine={zeroLine}
                    alignLeft={item.value > 0}
                />
            </div>
        </div>
    );
};

export default Line;
