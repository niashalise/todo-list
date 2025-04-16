function TodoListItem({ todo, onCompleteTodo }) {
    return (
    <li>
        <form>
            <input type="checkbox" checked={todo.isCompleted} onChange={() => onCompleteTodo(todo.key)} />
        </form>
        {todo.workingTodo}
    </li>
    );
}

export default TodoListItem;