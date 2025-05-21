import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from '../src/features/TodoForm';
import { useEffect, useState, useCallback } from 'react';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css'

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowing, setIsShowing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const encodeUrl = useCallback(
    () => {
      let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
      let searchQuery = '';
      if (searchQuery) {
        searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
      }
      return encodeURI(`${url}?${sortQuery}${searchQuery}`);
    },
    [sortField, sortDirection, queryString]
  );

  const handleAdd = async (workingTodo) => {
    console.log('Working Todo: ', workingTodo);
    const payload = {
      records: [
        {
          fields: {
            title: workingTodo,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      setIsSaving(true);
      console.log('Payload', payload);
      const resp = await fetch(encodeUrl(), options);
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error);
      console.log(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const updatedTodo = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    // console.log("Complete: ", todoList, updatedTodo)
    setTodoList(updatedTodo);

    const payload = {
      records: [
        {
          id: originalTodo.id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return { ...originalTodo };
        } else {
          return todo;
        }
      });
      setTodoList([...revertedTodos]);
    }
  }

  const updateTodo = async (editedTodo) => {
    // console.log(editedTodo);
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    // console.log("Original Todo", originalTodo)
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const { records } = await resp.json();
      console.log('Records: ', records);

      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
      // console.log("Updated todo: ", updatedTodo)
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          // console.log("It\'s true", updatedTodo)
          return { ...updatedTodo };
        } else {
          return todo;
        }
      });
      setTodoList([...updatedTodos]);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return { ...originalTodo };
        } else {
          return todo;
        }
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  };

  const updateLoading = () => {
    setIsLoading((prevState) => !prevState);
  };

  const updateErrorMessage = () => {
    setErrorMessage();
  };

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: 'GET',
        body: JSON.stringify(),
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(encodeUrl(), options);
        console.log(resp);
        if (resp.ok === false) {
          throw new Error(resp.message);
        }
        const data = await resp.json();
        // console.log(data);
        const todoRecords = data.records.map((record) => {
          const todo = {
            id: record.id,
            createdTime: record.createdTime,
            title: record.fields.title,
          };
          return todo;
        });
        setTodoList([...todoRecords]);
        console.log(todoRecords);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);
  // console.log("Todo List", todoList)
  return (
    <div className={styles.content}>
      <h1>My Todos</h1>
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
              setErrorMessage('');
            }}
          >
            Dismiss
          </button>{' '}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
