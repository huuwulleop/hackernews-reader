
const InputWithLabel = ({ id, type, value, onInputChange, children }) => {
    return (
        <>
            <label htmlFor={id}>{children} </label>
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