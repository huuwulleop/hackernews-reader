
const title = "HackerNews Reader"

const list = [
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
  return (
    <div>
      <h1>Welcome to {title}</h1>

      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />

      <hr />

      {list.map(item => (
        <div key={item.objectID}>{item.title}</div>
      ))}
    </div>
  )
}

export default App;
