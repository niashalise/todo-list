import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';

function TodosPage({
  isLoading,
  isSaving,
  todoList,
  completeTodo,
  updateTodo,
  handleAdd,
  setSortDirection,
  setSortField,
  setQueryString,
  queryString,
  errorMessage,
}) {
  return (
    <>
      <TodoForm handleAdd={handleAdd} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={
          isLoading ? (
            <p>Todo list loading...</p>
          ) : (
            <p>Add a todo above to get started</p>
          )
        }
      />
      <hr />
      <TodosViewForm
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        setQueryString={setQueryString}
        queryString={queryString}
      />
      {errorMessage ? (
        <div className={styles.errorDiv}>
          <hr />
          <p>{errorMessage}</p>
          <button
            type="button"
            onClick={() => {
              setIsShowing((prevState) => !prevState);
              dispatch({ type: 'clearError' });
            }}
          >
            Dismiss
          </button>{' '}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TodosPage;
