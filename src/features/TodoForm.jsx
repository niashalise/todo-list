import { useRef, useState } from "react";

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
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" ref={todoTitleInput} onChange={handleInputChange} value={workingTodo}/>
            <button type="submit" disabled={workingTodo === ""}>Add Todo</button>
        </form>
    );
}

export default TodoForm