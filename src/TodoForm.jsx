import { useRef } from "react";

function TodoForm({handleAdd}) {

    const handleAddTodo = (e) => {
        e.preventDefault();
        // console.dir(e.target.title);
        const title = e.target.title.value;
        todoTitleInput.current.focus();
        handleAdd(title);
    }

    const todoTitleInput = useRef("");

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" ref={todoTitleInput}></input>
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default TodoForm