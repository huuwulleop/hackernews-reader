
import React, { useState } from "react"

const Search = ({ onSearch, searchTerm }) => {
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onChange={onSearch} />

            {searchTerm &&
                <p>
                    Searching for <strong>{searchTerm}</strong>...
                </p>
            }
        </div>
    )
}

export default Search