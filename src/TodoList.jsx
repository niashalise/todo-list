{/*extract from TodoList.jsx */}

function TodoList() {
    const todos = [
        { id: 1, title: 'take notes' },
        { id: 2, title: 'study' },
        { id: 3, title: 'code' },
    ];

    return (
    <ul>
        {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
        ))}
    </ul>
    );
}

export default TodoList