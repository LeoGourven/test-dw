import React, { useState } from 'react';

export default function ColumnTypeRadio({
    initialValue = 'text',
    autoType = 'text',
    disabled = false,
    onChange
}) {
    const [value, setValue] = useState(initialValue);

    const options = [
        { label: `Auto (${autoType})`, value: 'auto' },
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Date', value: 'date' }
    ];

    const handleRadioChange = (optionValue) => {
        setValue(optionValue);
        if (onChange) {
            onChange(optionValue);
        }
    };

    return (
        <div className={`htItemWrapper ${disabled ? 'disabled' : ''}`}>
            <div className="htItemLabel">Column Type:</div>
            <div className="is-flex is-flex-direction-column ml-2 mt-1">
                {options.map((option) => (
                    <label
                        className="is-flex is-align-items-center"
                        style={{ gap: '5px' }}
                        key={option.value}
                    >
                        <input
                            disabled={disabled}
                            type="radio"
                            name={option.value}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => handleRadioChange(option.value)}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
