import React, { useState, useEffect } from "react"

// components
import List from "./components/List"
import Search from "./components/Search"

// hooks
import useSemiPersistentState from "./hooks/useSemiPersistentState"

const title = "HackerNews Reader"

const initialStories = [
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

// TODO:
const getAsyncStories = () => (
    new Promise(resolve => (
        setTimeout(() => (
            resolve({ data: { stories: initialStories } })
        ), 2000)
    ))
)

const App = () => {
    const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React")

    const [stories, setStories] = useState([])

    // Get stories
    useEffect(() => {
        getAsyncStories().then(result => {
            setStories(result.data.stories)
        })
    }, [])

    // Remove story
    const handleRemoveStory = (item) => {
        const newStories = stories.filter(story => (
            item.objectID !== story.objectID
        ))

        setStories(newStories)
    }

    const handleSearch = event => {
        setSearchTerm(event.target.value)
        // console.log(event.target.value);
    }

    const searchedStories = stories.filter(story => (
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    return (
        <div>
            <h1>{title}</h1>

            <Search onSearch={handleSearch} searchTerm={searchTerm} />

            <hr />

            <List list={searchedStories} onRemoveItem={handleRemoveStory} />
        </div>
    )
}

export default App;
