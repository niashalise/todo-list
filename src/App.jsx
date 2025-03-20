import './App.css'

function App() {
  const todos = [
    {id: 1, title: "take notes"},
    {id: 2, title: "study"},
    {id: 3, title: "code"}
  ]
  return (
    <div>
      <h1>My Todos</h1>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
