function Notification({ message, isError }) {
    if(!message) return;
    return (
        <div className={`notification ${isError ? 'error' : ''}`}>
            {message}
        </div>
    )
}

export default Notification