const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',
  //actions found in addTodo
  addTodo: 'addTodo',
  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  //reverts todos when requests fail
  revertTodo: 'revertTodo',
  //action on Dismiss Error button
  clearError: 'clearError',
};

function reducer(state, action) {
  state = initialState;

  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      const todoRecords = action.records.map((record) => {
        const todo = {
          id: record.id,
          createdTime: record.createdTime,
          title: record.fields.title,
        };
        return todo;
      });
      return {
        ...state,
        todoList: todoRecords,
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo:
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case actions.updateTodo:
      const originalTodo = todoList.find(
        (todo) => todo.id === action.editedTodo.id
      );
      const updatedTodo = {
        id: records[0]['id'],
        ...records[0].fields,
      };
      if (!records[0].fields.isCompleted) {
        updatedTodo.isCompleted = false;
      }
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        } else {
          return todo;
        }
      });
      const updatedState = {
        ...state,
        ...updatedTodos,
      };
      if (action.error) {
        updatedTodos = {
          errorMessage: action.error.message,
        };
      }
      return {
        ...state,
        updatedState,
      };
    case actions.completeTodo:
      const completedTodo = todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
      return {
        ...state,
        todoList: { ...completedTodo },
      };
    case actions.revertTodo:
        const revertedTodos = todoList.map((todo) => {
            if (todo.id === originalTodo.id) {
                return { ...originalTodo };
            } else {
                return todo;
            }
        })
      return {
        ...state,
        todoList: { ...revertedTodos}
      };
    case actions.clearError:
      return {
        ...state,
        errorMessage: ""
      };
    default:
      return state;
  }
}

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

module.exports = { initialState, actions };
