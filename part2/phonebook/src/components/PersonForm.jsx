
function PersonForm({
    name,
    number,
    onChangeName,
    onChangeNumber,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={name} onChange={onChangeName} />
            </div>
            <div>
                Number: <input value={number} onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm