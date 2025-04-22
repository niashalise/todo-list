import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({handleAdd}) {
    const [workingTodo, setWorkingTodo] = useState("")

    const handleAddTodo = (e) => {
        e.preventDefault();
        todoTitleInput.current.focus();
        handleAdd(workingTodo);
        setWorkingTodo('');
    }

    const handleInputChange = (e) => {
        const input = e.target.value;
        setWorkingTodo(input)
    }

    const todoTitleInput = useRef("");

    return (
    <form onSubmit={handleAddTodo}>
        <TextInputWithLabel ref={todoTitleInput} onChange={handleInputChange} value={workingTodo} elementId="title" labelText="Todo" />
        <button type="submit" disabled={workingTodo === ''}>Add Todo</button>
    </form>
    );
}

export default TodoForm