import { useEditorContext } from '../EditorContext';
import { useSettingsContext } from '../SettingsContext';

export default function Settings() {
    const { dataset } = useEditorContext();
    const {
        selectedColumnValues,
        setSelectedColumnValues,
        selectedColumnLabels,
        setSelectedColumnLabels,
        areLabelsInside,
        setAreLabelsInside
    } = useSettingsContext();
    if (!selectedColumnValues || !selectedColumnLabels) return null;

    // @todo: ensure that we have at least one column of type number and one of type text
    const availablesValues = dataset.columns().filter((d) => d.type() === 'number');
    const availablesLabels = dataset.columns().filter((d) => d.type() === 'text');

    return (
        <>
            <h3 className="title is-5">Settings</h3>
            <div className="field">
                <label className="label">Select column values</label>
                <select
                    className="select"
                    onChange={(e) => {
                        setSelectedColumnValues(availablesValues[e.target.value]);
                    }}
                    defaultValue={selectedColumnValues}
                >
                    {availablesValues.map((d, index) => (
                        <option key={d.title()} value={index}>
                            {d.title()}
                        </option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label className="label">Select column labels</label>
                <select
                    className="select"
                    onChange={(e) => {
                        setSelectedColumnLabels(availablesLabels[e.target.value]);
                    }}
                    defaultValue={selectedColumnLabels}
                >
                    {availablesLabels.map((d, index) => (
                        <option key={d.title()} value={index}>
                            {d.title()}
                        </option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label className="label">Display values inside bar</label>
                <input
                    type="checkbox"
                    onChange={() => setAreLabelsInside((state) => !state)}
                    checked={areLabelsInside}
                />
            </div>
        </>
    );
}
