import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({handleAdd, isSaving}) {
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

    // const StyledButton = styled.button`
    //   & {
    //     padding: 3px;
    //     margin: 0px 10px 5px 5px;
    //     background-color: pink;
    //     border: 2px solid hotpink;
    //   }
    // `;

    return (
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          ref={todoTitleInput}
          onChange={handleInputChange}
          value={workingTodo}
          elementId="title"
          labelText="Todo"
        />
        <button type="submit" disabled={workingTodo === '' || isSaving}>
          {isSaving ? 'Saving...' : 'Add Todo'}
        </button>
      </form>
    );
}

export default TodoForm