
import React, { useState } from "react"

// components
import InputWithLabel from "./InputWithLabel";

const Search = ({ handleSearchInput, handleSearchSubmit, searchTerm }) => {
    return (
        <>
            <InputWithLabel
                id="search"
                label="Search"
                type="text"
                value={searchTerm}
                isFocused
                onInputChange={handleSearchInput}
            >
                <strong>Search:</strong>
            </InputWithLabel>

            &nbsp;

            <button
                type="button"
                disabled={!searchTerm}
                onClick={handleSearchSubmit}
            >
                Submit
            </button>

            {searchTerm &&
                <p>
                    Searching for <strong>{searchTerm}</strong>...
                </p>
            }
        </>
    )
}

export default Search