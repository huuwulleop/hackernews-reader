
const InputWithLabel = ({ id, label, type, value, onInputChange }) => {
    return (
        <>
            <label htmlFor={id}>{label}: </label>
            {/* &nbsp; */}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onInputChange}
            />
        </>
    )
}

export default InputWithLabel