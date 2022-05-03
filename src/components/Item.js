
const Item = ({ item }) => {
    return (
        <li>
            <a href={item.url}>{item.title}</a>

            <span> {item.author}</span>
            <span> {item.num_comments}</span>
            <span> {item.points}</span>
        </li>
    )
}

export default Item