import React, { useState, useEffect, useReducer, useCallback, Fragment } from "react"

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
        case "STORIES_FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case "STORIES_FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case "STORIES_FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case "SET_STORIES":
            return action.payload
        case "REMOVE_STORY":
            return {
                ...state,
                data: state.data.filter(story => (
                    action.payload.objectID !== story.objectID
                ))
            }
        default:
            throw new Error()
    }
}

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query="

const App = () => {
    const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React")
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`)

    // const [stories, setStories] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(false)

    // reducer
    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false }
    )

    // Get stories
    const handleFetchStories = useCallback(() => {
        dispatchStories({ type: "STORIES_FETCH_INIT" })

        fetch(url)
            .then(response => response.json())
            .then(result => {
                dispatchStories({
                    type: "STORIES_FETCH_SUCCESS",
                    payload: result.hits
                })
            })
            .catch(() => (
                dispatchStories({ type: "STORIES_FETCH_FAILURE" })
            ))
    }, [url])

    useEffect(() => {
        handleFetchStories()
    }, [handleFetchStories])

    // Remove story
    const handleRemoveStory = (item) => {
        // setStories(newStories)
        dispatchStories({
            type: "REMOVE_STORY",
            payload: item,
        })
    }

    const handleSearchInput = event => {
        setSearchTerm(event.target.value)
        // console.log(event.target.value);
    }

    const handleSearchSubmit = () => {
        setUrl(`${API_ENDPOINT}${searchTerm}`)
    }

    // Filters garbage articles
    const checkNull = story => {
        if (!story.title || !story.url || !story.author || !story.num_comments || !story.points) {
            return false
        }
        return true
    }

    // search only after clicking submit
    const searchedStories = stories.data.filter(story => (
        checkNull(story) // && story.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    return (
        <div>
            <h1>{title}</h1>

            <Search
                handleSearchInput={handleSearchInput}
                handleSearchSubmit={handleSearchSubmit}
                searchTerm={searchTerm}
            />

            {searchTerm && stories.isLoading &&
                <p>
                    Searching for <strong>{searchTerm}</strong>...
                </p>
            }

            <hr />

            {stories.isError && <p>Failed to load articles</p>}

            {stories.isLoading ? (
                <p>Loading articles...</p>
            ) : (
                <List list={searchedStories} onRemoveItem={handleRemoveStory} />
            )}

            {searchedStories.length === 0 && !stories.isLoading && !stories.isError && <p>No articles found</p>}

        </div>
    )
}

export default App;
