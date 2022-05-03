
import React, { useState } from "react"

const Search = ({ onSearch, searchTerm }) => {
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={onSearch}
            />

            {searchTerm &&
                <p>
                    Searching for <strong>{searchTerm}</strong>...
                </p>
            }
        </div>
    )
}

export default Search