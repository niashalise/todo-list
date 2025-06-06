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
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      const todoRecords = action.action.records.map((record) => {
        const todo = {
          id: record.id,
          createdTime: record.createdTime,
          title: record.fields.title,
          isCompleted: !!record.fields.isCompleted
        };
        return todo;
      });
      return {
        ...state,
        todoList: todoRecords,
        isLoading: false,
      };
    case actions.setLoadError:
      console.log("action: ", action);
      return {
        ...state,
        errorMessage: action.action.message,
        isLoading: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo:
      console.log("action: ", action);
      const savedTodo = {
        id: action.action[0].id,
        title: action.action[0].fields.title,
        isCompleted: action.action[0].fields.isCompleted,
      };
      if (!action.action[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      console.log("state: ", state);
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
    case actions.updateTodo:
      console.log("action: ", action)
      const originalTodo = state.todoList.find(
        (todo) => todo.id === action.action
      );
      const updatedTodo = action.action;
      console.log("updated todo: ", updatedTodo);
      if (!updatedTodo.isCompleted) {
        updatedTodo.isCompleted = false;
      }
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        } else {
          return todo;
        }
      });
      const updatedState = {
        ...state,
        todoList: updatedTodos,
      };
      if (action.error) {
        updatedTodos = {
          errorMessage: action.error.message,
        };
      }
      return updatedState;
    case actions.completeTodo:
      const completedTodo = state.todoList.map((todo) => {
        if (todo.id === action.action) {
          // console.log("isCompleted: ", completedTodo)
          return { ...todo, isCompleted: true };
        }
        return todo;
      });
      return {
        ...state,
        todoList: completedTodo,
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
        todoList: revertedTodos
      };
    case actions.clearError:
      return {
        ...state,
        errorMessage: ""
      };
    case actions.isSaving:
      return {
        ...state,
        isSaving: action.action
      }
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

export { initialState, actions, reducer }
