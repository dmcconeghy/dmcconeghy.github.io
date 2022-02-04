import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import "./App.css";

function NewTodoForm({ addTodo }) {

    const [text, setText] = useState("")

    const handleChange = evt => {
        setText(evt.target.value)
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        addTodo({text, id: uuid() })
        setText("")
    }

    return (
        <div className="TodoForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="todo">Todo item:</label>
                <input
                    id="todo"
                    name="todo"
                    type="textarea"
                    placeholder="Enter a todo item"
                    onChange={handleChange}
                    value={text}    
                    />
                <button name="submit">Add it!</button>
            </form>
        </div>
    )


}

export default NewTodoForm;
