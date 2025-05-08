function preventRefresh(e) {
  e.preventDefault();
}

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="search">Search Todos: </label>
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => setQueryString('')}
          >
            Clear
          </button>
        </div>
        <div>
          <label htmlFor="sortBy">Sort By: </label>
          <select
            id="sortBy"
            name="sortBy"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </select>
          <label htmlFor="direction">Direction: </label>
          <select
            id="direction"
            name="direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default TodosViewForm;
