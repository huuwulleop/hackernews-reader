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
            // return state.filter(story => (
            //     action.payload.objectID !== story.objectID
            // ))
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

    // const [stories, setStories] = useState([])

    // reducer
    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false }
    )

    // const [isLoading, setIsLoading] = useState(false)
    // const [isError, setIsError] = useState(false)

    // Get stories
    useEffect(() => {
        // setIsLoading(true)
        dispatchStories({ type: "STORIES_FETCH_INIT" })

        // getAsyncStories()
        //     .then(result => {
        //         // setStories(result.data.stories)
        //         dispatchStories({
        //             type: "STORIES_FETCH_SUCCESS",
        //             payload: result.data.stories,
        //         })
        //         // setIsLoading(false)
        //     })
        fetch(`${API_ENDPOINT}react`)
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
    }, [])

    // Remove story
    const handleRemoveStory = (item) => {
        // const newStories = stories.filter(story => (
        //     item.objectID !== story.objectID
        // ))

        // setStories(newStories)
        dispatchStories({
            type: "REMOVE_STORY",
            payload: item,
        })
    }

    const handleSearch = event => {
        setSearchTerm(event.target.value)
        // console.log(event.target.value);
    }

    // From using combined reducer (data)
    const searchedStories = stories.data.filter(story => (
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    return (
        <div>
            <h1>{title}</h1>

            <Search onSearch={handleSearch} searchTerm={searchTerm} />

            {stories.isError && <p>Failed to load articles</p>}

            <hr />
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
