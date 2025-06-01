
function Person({ data: { name, number }, onClick }) {
    return (
        <li >{name} | {number} <button onClick={onClick}>Remove</button></li>
    )
}

export default Person