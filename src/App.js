import React, { useState, useEffect, useReducer } from "react"
import { act } from "react-dom/test-utils"

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

const storiesReducer = (state, action) => {
    switch (action.type) {
        case "SET_STORIES":
            return action.payload
        case "REMOVE_STORIES":
            return state.filter(story => (
                action.payload.objectID !== story.objectID
            ))
        default:
            throw new Error()
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React")

    // const [stories, setStories] = useState([])

    // reducer
    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        []
    )

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    // Get stories
    useEffect(() => {
        setIsLoading(true)

        getAsyncStories()
            .then(result => {
                // setStories(result.data.stories)
                dispatchStories({
                    type: "SET_STORIES",
                    payload: result.data.stories,
                })
                setIsLoading(false)
            })
            .catch(() => setIsError(true))
    }, [])

    // Remove story
    const handleRemoveStory = (item) => {
        // const newStories = stories.filter(story => (
        //     item.objectID !== story.objectID
        // ))

        // setStories(newStories)
        dispatchStories({
            type: "REMOVE_STORIES",
            payload: item,
        })
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

            {isError && <p>Failed to load articles</p>}

            <hr />
            {isLoading ? (
                <p>Loading articles...</p>
            ) : (
                <List list={searchedStories} onRemoveItem={handleRemoveStory} />
            )}

        </div>
    )
}

export default App;
