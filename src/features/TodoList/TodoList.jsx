import styles from '/Users/niascott/Desktop/todo-list/src/TodoList.module.css'
import TodoListItem from '../TodoList/TodoListItem';
import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';


function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const navigate = useNavigate();

  const filteredTodoList = todoList.filter(
    (todo) => !todo.isCompleted
  );
    console.log(filteredTodoList)

    const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

  const totalPages = Math.ceil((filteredTodoList.length / itemsPerPage));

  const handlePreviousPage = () => {
    setSearchParams({ page: Math.max(1, currentPage - 1) });
  }

  const handleNextPage = () => {
    setSearchParams({page: Math.min(currentPage + 1, totalPages)})
  }

  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage < 1 || currentPage > totalPages || isNaN(currentPage)) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate])

  return todoList.length === 0 ? (
    <p>Add a todo above to get started</p>
  ) : (
    <>
      <ul className={styles.list}>
        {currentTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
      </ul>
      <div className="paginationControls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default TodoList;
