import styles from './SwitchInput.module.scss';
export default function SwitchInput({ label = '', value = false, onChange }) {
    const handleChange = (e) => {
        value = e.target.checked;
        if (onChange) onChange(value);
    };
    return (
        <div className={`field switch ${styles.switch} ${value ? styles.checked : ''}`}>
            <label>
                <input type="checkbox" checked={value} onChange={handleChange} />
                {label}
            </label>
        </div>
    );
}
