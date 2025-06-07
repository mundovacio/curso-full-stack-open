function Search({ onSubmit, onChange, value }) {

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="searchInput">Find countries</label>
      <input type="text" id="searchInput" placeholder="Finland" onChange={onChange} value={value} />
    </form>
  )
}

export default Search