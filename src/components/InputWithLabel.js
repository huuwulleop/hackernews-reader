import React, { useEffect, useRef } from "react"

const InputWithLabel = ({ id, type, value, onInputChange, isFocused, children }) => {
    const inputRef = useRef()

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isFocused])
    
    return (
        <>
            <label htmlFor={id}>{children} </label>
            {/* &nbsp; */}
            <input
                ref={inputRef}
                type={type}
                id={id}
                value={value}
                onChange={onInputChange}
            />
        </>
    )
}

export default InputWithLabel