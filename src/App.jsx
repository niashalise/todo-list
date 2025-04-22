import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from '../src/features/TodoForm';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  const handleAdd = (workingTodo) => {
    const newTodo = { key: Date.now(), workingTodo, isCompleted: false };
    setTodoList([...todoList, newTodo]);
  };

  function completeTodo(key) {
    const updatedTodo = todoList.map((todo) => {
      if (todo.key === key) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    setTodoList(updatedTodo);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm handleAdd={handleAdd} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
