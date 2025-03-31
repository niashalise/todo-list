{/*extract from TodoList.jsx */}
import TodoListItem from "./TodoListItem";

function TodoList() {
    const todos = [
        { id: 1, title: 'take notes' },
        { id: 2, title: 'study' },
        { id: 3, title: 'code' },
    ];

    return (
    <ul>
        {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
        ))}
    </ul>
    );
}

export default TodoList;