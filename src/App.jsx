import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from '../src/features/TodoForm';
import { useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isShowing, setIsShowing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async (workingTodo) => {
    const payload = {
      records: [{
        fields: {
          title: workingTodo.title,
          isCompleted: workingTodo.isCompleted
        }
      }]
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    try {
      setIsSaving(true);
      const resp = await fetch(url, options)
      if (!resp.ok) {
        throw new Error(resp.message)
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        title: records.fields.title,
        isCompleted: records.fields.isCompleted
      }
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    }
    catch {
      console.log(errorMessage);
      setErrorMessage(errorMessage)
    }
    finally {
      setIsSaving(false);
    }
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

  const updateTodo = (editedTodo) => {
    console.log(editedTodo);
    const updatedTodos = todoList.map((todo) => {
      if (todo.key === editedTodo.key) {
        return { ...todo, workingTodo: editedTodo.title}
      } else {
        return todo
      }
    })
    setTodoList(updatedTodos)
  }

const updateLoading = () => {
  setIsLoading(prevState => !prevState);
}

const updateErrorMessage = () => {
  setErrorMessage();
}

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const token = `Bearer ${import.meta.env.VITE_PAT}`;

useEffect(
    () => {
    const fetchTodos = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      body: JSON.stringify(),
      headers: {Authorization: token}
    }
  try {
    const resp = await fetch(url, options);
    console.log(resp);
    if (resp.ok === false) {
      throw new Error(resp.message)
    }
    const data = await resp.json();
    console.log(data);
    const todoRecords = data.records.map((record) => {
      const todo = {
        id: record.id,
        createdTime: record.createdTime,
        title: record.fields.title
      };
    })
    console.log(todoRecords);
  }
  catch (error) {
    setErrorMessage(error.message)
  }
  finally {
    setIsLoading(false);
  }
  }
  fetchTodos();
  }, [])

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm handleAdd={handleAdd} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading ? <p>Add a todo above to get started</p> : <p>Todo list loading...</p>}
      />
      {errorMessage ? <div><hr /><p>{errorMessage}</p><button type="button" onClick={() => {setIsShowing(prevState => !prevState)}}>Dismiss</button> </div> : <></>}
    </div>
  );
}

export default App;
