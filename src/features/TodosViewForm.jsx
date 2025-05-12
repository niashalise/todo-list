import { useState, useEffect } from 'react';

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
  const [localQueryString, setLocalQueryString] = useState(queryString);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return (
        () => clearTimeout(debounce)
    )
  }, [localQueryString, setLocalQueryString]);

  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="search">Search Todos: </label>
          <input
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
          <button type="button" onClick={(e) => setLocalQueryString('')}>
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
