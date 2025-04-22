{
  /*extract from TodoList.jsx */
}
import TodoListItem from '../TodoList/TodoListItem';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter(
    (todo) => todo.isCompleted === false
  );

  return todoList.length === 0 ? (
    <p>Add a todo above to get started</p>
  ) : (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.key}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
