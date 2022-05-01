
import React, { useState } from "react"

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = event => {
        setSearchTerm(event.target.value)
        console.log(event.target.value);
    }
    
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onChange={handleChange} />

            {searchTerm &&
                <p>
                    Searching for <strong>{searchTerm}</strong>...
                </p>
            }
        </div>
    )
}

export default Search