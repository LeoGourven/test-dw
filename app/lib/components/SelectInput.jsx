export default function SelectInput({ options = [], label = '', value, onChange }) {
    const handleChange = (e) => {
        value = e.target.value;
        if (onChange) onChange(value);
    };

    return (
        <div className="field">
            <div className="label">{label}</div>
            <div className="select">
                <select value={value} onChange={handleChange} style={{ minWidth: '300px' }}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
