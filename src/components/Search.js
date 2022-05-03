
import React, { useState } from "react"

// components
import InputWithLabel from "./InputWithLabel";

const Search = ({ onSearch, searchTerm }) => {
    return (
        <>
            <InputWithLabel
                id="search"
                label="Search"
                type="text"
                value={searchTerm}
                onInputChange={onSearch}
            />
            {searchTerm &&
                <p>
                    Searching for <strong>{searchTerm}</strong>...
                </p>
            }
        </>
    )
}

export default Search