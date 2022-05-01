import React, { useState } from "react"

// components
import List from "./components/List"

const title = "HackerNews Reader"

const stories = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    },
]

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    
    const handleChange = event => {
        setSearchTerm(event.target.value)
        console.log(event.target.value);
    }

    return (
        <div>
            <h1>Welcome to {title}</h1>

            <label htmlFor="search">Search: </label>
            <input type="text" id="search" onChange={handleChange} />

            <hr />

            <List list={stories} />
        </div>
    )
}

export default App;
