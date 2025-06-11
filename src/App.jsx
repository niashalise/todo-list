import './App.css';
import { useEffect, useState, useCallback, useReducer } from 'react';
import styles from './App.module.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';
import Header from './shared/Header';
import TodosPage from './pages/TodosPage';
import { Routes, useLocation } from 'react-router';
import { Route } from 'react-router';
import About from './pages/About';
import NotFound from './pages/NotFound';


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [isShowing, setIsShowing] = useState(true);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [title, setTitle] = useState('Todo List');
  

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (searchQuery) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

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
      dispatch({ type: todoActions.isSaving, value: 'true' });
      console.log('Payload', payload);
      const resp = await fetch(encodeUrl(), options);
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, action: records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, action: error });
    } finally {
      dispatch({ type: todoActions.isSaving, value: 'false' });
    }
  };

  async function completeTodo(id) {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    dispatch({ type: todoActions.completeTodo, action: id });

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
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return { ...originalTodo };
        } else {
          return todo;
        }
      });
      dispatch({ type: todoActions.revertTodo, action: revertedTodos });
    }
  }

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

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
      dispatch({ type: todoActions.updateTodo, action: editedTodo });
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, action: originalTodo });
    } finally {
      dispatch({ type: todoActions.isSaving, action: false });
    }
  };

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = {
        method: 'GET',
        body: JSON.stringify(),
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(encodeUrl(), options);
        console.log(resp);
        if (resp.ok === false) {
          throw new Error(resp.status);
        }
        const data = await resp.json();
        dispatch({ type: 'loadTodos', action: data });
      } catch (error) {
        console.log('error: ', error);
        dispatch({ type: todoActions.setLoadError, action: error });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  const location = useLocation();

  useEffect(
    () => {
      if (location.pathname === '/') {
        setTitle('Todo List');
      } else if (location.pathname === '/about') {
        setTitle('About');
      } else {
        setTitle('Not Found');
      }
    },
    [location]
  );

  return (
    <div className={styles.content}>
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              isSaving={todoState.isSaving}
              todoList={todoState.todoList}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              handleAdd={handleAdd}
              setSortDirection={setSortDirection}
              setSortField={setSortDirection}
              setQueryString={setQueryString}
              queryString={queryString}
            />
          }
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/\/*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
