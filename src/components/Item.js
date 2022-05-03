
const Item = ({ item, onRemoveItem }) => {
    return (
        <li>
            <span>
                <button type="button" onClick={() => onRemoveItem(item)}>
                    Delete
                </button>
            </span>

            <a href={item.url}>{item.title}</a>

            <span> {item.author}</span>
            <span> {item.num_comments}</span>
            <span> {item.points}</span>
        </li>
    )
}

export default Item