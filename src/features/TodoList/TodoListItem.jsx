import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import TodoForm from '../TodoForm';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState("");

  const handleCancel = () => {
    setWorkingTitle(todo.workingTodo)
    setIsEditing(false);
  };

  const handleEdit = (e) => {
    console.log(e.target.value)
    setWorkingTitle(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (isEditing === false) {
      return;
    }
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.key}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.key)}
              />
            </label>
            <span
              onClick={() =>
                setIsEditing(true)}
            >
              {todo.workingTodo}
            </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
