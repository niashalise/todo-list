import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);

  const handleAdd = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm handleAdd={handleAdd} />
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App;
