
const Item = ({ item, onRemoveItem }) => {
    return (
        <li>
            {/* <span>
                <button type="button" onClick={() => onRemoveItem(item)}>
                    Delete
                </button>
            </span> */}
            &nbsp;
            <a href={item.url}>{item.title}</a>

            <span> by <strong>{item.author}</strong></span>
            <br />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;Points: {item.points}</span>
            <span> Comments: {item.num_comments}</span>
        </li>
    )
}

export default Item