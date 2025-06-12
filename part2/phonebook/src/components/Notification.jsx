const Notification = ({ message, isError }) => {
    if (!message) {
        return null
    }

    return (
        <div className={`notification ${isError ? 'error' : ''}`}>
            {message}
        </div>
    )
}

export default Notification