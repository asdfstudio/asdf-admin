import styles from "./input.module.css";

const Input = ({
    type = '',
    name = '',
    placeholder = '',
    label = '',
    onChange = () => {},
    inputContainerStyle = {},
    value = '',
    disabled = false

    
}) => {
    return (
        <div 
            className={styles['input-container']}
            style={inputContainerStyle}
        >
            <p className={styles['label-container']}>{label}</p>
            <input
                className={styles['input-style']} 
                type={type}
                name={name}
                placeholder={placeholder}
                label={label}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
        </div>
    );
}
export default Input;